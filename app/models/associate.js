const mongoose = require('mongoose')
const AssociateScheme = new mongoose.Schema({
    name: {
      type: String
    },
    surname: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    gender: {
        type: String
      },
      isTeacher: {
        type: Boolean
      },
    
    // Se agrega el campo "disciplines"
    disciplines: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'discipline'
    }]
  }, {
    timestamps: true,
    versionKey: false
  });
  
  module.exports = mongoose.model('associate', AssociateScheme);