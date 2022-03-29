const mongoose = require("mongoose");

const characters = ['akatsuki', 'byakuya', 'carmine', 'chaos', 'eltnum', 'enkidu', 'gordeau', 'hilda', 'hyde', 'linne', 'londrekia', 'merkava', 'mika', 'nanase',
                    'orie', 'phonon', 'seth', 'vatista', 'wagner', 'waldstein', 'yuzuriha' ];

const regions = ['n/a', 'west coast', 'southwest', 'midwest', 'western canada', 'eastern canada', 'east coast', 'southeast', 'latin america north',
                 'latin america south', 'asia', 'europe', 'oceania'];

const playerSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Player must have a name"],
        lowercase: true,
        trim: true,
    },
    main: {
        type: String,
        required: [true, "Player must main a character"],
        lowercase: true,
        trim: true,
        enum: {
            values: characters,
            message: '{VALUE} is not a valid character in undernight'
        }
    },

    region: {
        type: String,
        lowercase: true,
        trim: true,
        enum: regions
    },

    subs: {
        type: [String],
        enum: {
            values: characters,
            message: '{VALUE} is not a valid character in undernight'
        }
    }
})

const Player = mongoose.model("Player", playerSchema);

module.exports.Player = Player;
module.exports.regions = regions;
module.exports.characters = characters;