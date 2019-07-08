const mongoose = require('mongoose');

const estudioSchema = mongoose.Schema({
  title: String,
  users : Array,
}, {
    timestamps: true
});


module.exports = mongoose.model('estudios', estudioSchema);
