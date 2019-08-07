const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  nombreArchivo : String,
  nombreReferido : String,
  nombreCaptador : String,
  fecha : String,
  // pendiente hashear clave
}, {
    timestamps: true
  });

module.exports = mongoose.model('consultas', sucursalSchema);
