const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
  Nombres : String,
  ApellidoMaterno : String,
  ApellidoPaterno : String,
  Correo : String,
  Direccion : String,
  Numero : String,
  Rol : Number,
  Clave : String,
  // pendiente hashear clave
}, {
    timestamps: true
  });

module.exports = mongoose.model('files', sucursalSchema);
