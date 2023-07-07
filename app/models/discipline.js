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
    },
  
    // Se agrega el campo "associates"
    associates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'associate'
    }]
  }, {
    timestamps: true,
    versionKey: false
  });
  
  module.exports = mongoose.model('discipline', DisciplineScheme);