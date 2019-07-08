const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
  nombre : String,
  codigo_jurisdiccion : String,

}, {
    timestamps: true
});


module.exports = mongoose.model('materias', materiaSchema);
