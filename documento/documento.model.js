const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  nombre : String,
  nombreArchivo : String,
  tipo : String,
  // pendiente hashear clave
}, {
    timestamps: true
  });

module.exports = mongoose.model('documentos', sucursalSchema);
