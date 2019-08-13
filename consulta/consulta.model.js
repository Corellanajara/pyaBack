const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  nombreArchivo : String,
  nombreReferido : String,
  nombreCaptador : String,
  area : String,
  sede : String,
  fecha : String,
  estado : Number,
  modificado : Number,
  usuario : String
  // pendiente hashear clave
}, {
    timestamps: true
  });

module.exports = mongoose.model('consultas', sucursalSchema);
