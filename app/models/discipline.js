const mongoose = require('mongoose')

const DisciplineScheme = new mongoose.Schema({
    name: {
        type: String
    },
    teacher: {
        type: String
    },
    description: {
        type: String
    },

    days: {
        type: String
    },
    hour: {
        type: String,
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('discipline', DisciplineScheme)