const Causa = require('./causa.model.js');

//Create new causa
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const causa = new Causa({
        index : req.body.index,
        nombres: req.body.nombres || "Sin titulo",
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        materia: req.body.materia,
        parte : req.body.parte,
        datos : req.body.datos,
        cliente : req.body.cliente,
        clienteParte : req.body.clienteParte,
        contraParte : req.body.contraParte,
        hojaRuta : req.body.hojaRuta,
        sucursal : req.body.sucursal,
        juridisccion : req.body.juridisccion,
        userId : req.body.userId,
        menu : req.body.menu,
        users : req.body.users,
        estado : req.body.estado,
        estadoPago : req.body.estadoPago,
        fechaTermino : req.body.fechaTermino,

    });

    // Save causa in the database
    causa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los causaos."
        });
    });
};

// Retrieve all causas from the database.
exports.findAll = (req, res) => {
    Causa.find()
    .then(causas => {
        res.send(causas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer los causaos."
        });
    });
};
exports.findByCondicion = (req,res) => {
  Causa.find( req.body.condicion )
  .then(causa => {
      if(!causa) {
          return res.status(404).send({
              message: "No se encontro info con la id " + req.params.sucursalId
          });
      }
      res.send(causa);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "No encontrado causao  " + req.params.sucursalId
          });
      }
      return res.status(500).send({
          message: "No se puedo encontrar " + req.params.sucursalId
      });
  });
};
// Find a single causa with a causaId
exports.findByMateria = (req, res) => {


    Causa.find({ sucursal :req.params.sucursalId , juridisccion :req.body.juridisccionId })
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.sucursalId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado causao  " + req.params.sucursalId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.sucursalId
        });
    });
};


exports.getLast15 = (req,res) => {
  Causa.find({"createdAt":{ $gte:ISODate("2019-08-14"), $lt:ISODate("2019-08-31") }})
  .then(causa => {
      if(!causa) {
          return res.status(404).send({
              message: "No se encontro info con la id " + req.params.sucursalId
          });
      }
      res.send(causa);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "No encontrado causao  " + req.params.sucursalId
          });
      }
      return res.status(500).send({
          message: "No se puedo encontrar " + req.params.sucursalId
      });
  });

}
// Find a single causa with a causaId
exports.findOne = (req, res) => {
    Causa.find({ materia : req.params.causaId })
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.causaId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado causao  " + req.params.causaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.causaId
        });
    });
};

// Update a causa
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "causa content can not be empty"
        });
    }
    // Find and update causa with the request body
    Causa.findByIdAndUpdate(req.params.causaId, {
      index : req.body.index,
      nombres: req.body.nombres || "Sin titulo",
      apellido_p: req.body.apellido_p,
      apellido_m: req.body.apellido_m,
      materia: req.body.materia,
      parte : req.body.parte,
      datos : req.body.datos,
      cliente : req.body.cliente,
      clienteParte : req.body.clienteParte,
      contraParte : req.body.contraParte,
      hojaRuta : req.body.hojaRuta,
      sucursal : req.body.sucursal,
      juridisccion : req.body.juridisccion,
      userId : req.body.userId,
      menu : req.body.menu,
      users : req.body.users,
      estado : req.body.estado,
      estadoPago : req.body.estadoPago,
      fechaTermino : req.body.fechaTermino,
    }, {new: true})
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.causaId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.causaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.causaId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Causa.findByIdAndRemove(req.params.causaId)
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "causao no encontrado id " + req.params.causaId
            });
        }
        res.send({message: "causao borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "causao no encontrado id " + req.params.causaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el causao id " + req.params.causaId
        });
    });
};
