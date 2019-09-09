const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({

  nombreArchivo : String,
  nombre : String,
  fecha : String,
  fechaLimite : String,
  index : String,
  sucursal : String,
  area : String,
  revisor : Number,
  observaciones : Array,
  estado : Number

}, {
    timestamps: true
  });

module.exports = mongoose.model('escritos', sucursalSchema);
