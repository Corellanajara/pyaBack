const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
    sucursal : String,
    sucursal_code : String,
    title: String,
    users : Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('materiasSucursal', materiaSchema);
