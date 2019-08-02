const mongoose = require('mongoose');

const causaSchema = mongoose.Schema({

    index : Number ,
    nombres: String,
    apellido_p : String,
    apellido_m : String,
    materia : String,
    parte : String,
    hojaRuta : Array,

    // Desde aqui info de seguimiento
    datos : Array,
    cliente : Array,
    clienteParte : Array,
    contraParte : Array,
    sucursal : String,
    juridisccion : String,
    userId : String,
    menu : Array,
    users : Array,
    estado : Number,
    estadoPago : Number,


}, {
    timestamps: true
});


module.exports = mongoose.model('causas', causaSchema);
