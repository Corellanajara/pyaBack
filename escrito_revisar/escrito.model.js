const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({

  nombreArchivo : String,
  nombre : String,
  fecha : String,
  index : Number,
  sucursal : String,
  area : String,
  revisor : Number,
  observaciones : Array,
  estado : Number

}, {
    timestamps: true
  });

module.exports = mongoose.model('escritos', sucursalSchema);
