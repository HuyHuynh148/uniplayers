const mongoose = require('mongoose');
const {Player, regions, characters} = require('./models/player');

mongoose.connect('mongodb://localhost:27017/uniPlayers')
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    })


// const p = new Player( {
//     name: "Snappy",
//     main: "Chaos",
//     subs:['wagner', 'nanase', 'hyde'],
//     region: 'west coast'
// })

// p.save().then(p => {
//     console.log(p);
// })
// .catch(e => {
//     console.log(e);
// })

// const players = [
//     {
//         name: "Gosuda",
//         main: "Chaos",
//         subs:['seth'],
//         region: 'east coast'
//     },
//     {
//         name: "knotts",
//         main: "wagner",
//         subs:['seth', 'chaos', 'byakuya', 'gordeau'],
//         region: 'southwest'
//     },
//     {
//         name: "lotsm",
//         main: "Merkava",
//     },
//     {
//         name: "ESFCMario",
//         main: "Wagner",
//         subs:['phonon', 'byakuya', 'vatista'],
//     }
// ]

// Player.insertMany(players)
// .then(res => {
//     console.log(res)
// })
// .catch(e => {
//     console.log(e)
// })