// Requiring Express and running it as well as setting a path to the current directory
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Player = require('./models/player');

const characters = ['akatsuki', 'byakuya', 'carmine', 'chaos', 'eltnum', 'enkidu', 'gordeau', 'hilda', 'hyde', 'linne', 'londrekia', 'merkava', 'mika', 'nanase',
                    'orie', 'phonon', 'seth', 'vatista', 'wagner', 'waldstein', 'yuzuriha' ];

const regions = ['n/a', 'west coast', 'southwest', 'midwest', 'western canada', 'eastern canada', 'east coast', 'southeast', 'latin america north',
                 'latin america south', 'asia', 'europe', 'oceania'];

mongoose.connect('mongodb://localhost:27017/uniPlayers')
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Set a route to find all players
app.get('/players', async (req, res) => {
    const {main} = req.query;
    if (main) {
        const players = await Player.find({main});
        res.render('players/index', {players, main});
    }
    
    else {
        const players = await Player.find({});
        res.render('players/index', {players, main: "All"});
    }
})

app.get('/players/new', (req, res) => {
    res.render('players/new', {characters, regions});
})

app.post('/players', async (req, res) => {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    console.log(newPlayer);
    res.redirect(`/players/${newPlayer._id}`);
})

app.get('/players/:id', async (req, res) => {
    const { id } = req.params;
    const player = await Player.findById(id);
    res.render('players/details', {player});
})

app.get('/players/:id/edit', async (req, res) => {
    const { id } = req.params;
    const player = await Player.findById(id);
    res.render('players/edit', {player, regions, characters});
})

app.put('/players/:id', async(req, res) => {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/players/${player._id}`);
})

app.delete('/players/:id', async(req, res) => {
    const { id } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(id);
    res.redirect('/players');
})

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})