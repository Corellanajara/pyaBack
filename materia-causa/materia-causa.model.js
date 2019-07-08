const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
    sucursal : String,
    sucursal_code : String,
    title : String,
    title_code : String,
    materia_code : String,
    users : Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('causa_materias', materiaSchema);
