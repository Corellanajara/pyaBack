const mongoose = require('mongoose');

const juridisccionSchema = mongoose.Schema({
  nombre : String,
  codigo : String,

}, {
    timestamps: true
});


module.exports = mongoose.model('juridisccions', juridisccionSchema);
