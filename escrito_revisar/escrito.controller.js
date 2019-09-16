const Escrito = require('./escrito.model.js');
const fs   = require('fs');

exports.createEscrito = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }
    let archivo = req.files.file;

    let path = process.cwd()+'/archivos/escritos/'+req.body.index;
    fs.mkdir(path, { recursive: true }, (err,success) => {
      if (err) throw err;
      console.log(success);
      archivo.mv(path+"/"+archivo.name, function(err) {
        if (err)
          return res.status(500).send(err);
        console.log(path+"/"+archivo.name);
        res.send({message: "Archivo Subido Correctamente!"});
      });
    });
};
exports.create = (req, res) => {

    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const escrito = new Escrito({
        nombre : req.body.nombre,
        nombreArchivo : req.body.nombreArchivo,
        nombreArchivo : req.body.nombreArchivo,
        nombre : req.body.nombre,
        fecha : req.body.fecha,
        fechaLimite : req.body.fechaLimite,
        index : req.body.index,
        sucursal : req.body.sucursal,
        area : req.body.area,
        revisor : req.body.revisor,
        observaciones : req.body.observaciones,
        estado : req.body.estado,
    });

    escrito.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear el archivo."
        });
    });
};
exports.findAll = (req,res) => {
  Escrito.find()
  .then(Escritos => {
      res.send(Escritos);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error en traer los Escritos."
      });
  });
}

exports.findByCausa = (req,res) => {
  Escrito.find({ index : req.params.causaId })
  .then(Escritos => {
      res.send(Escritos);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error en traer los Escritos."
      });
  });
}

exports.findByEstado = (req,res) => {
  Escrito.find({ estado : req.params.estadoId })
  .then(Escritos => {
      res.send(Escritos);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error en traer los Escritos."
      });
  });
}


// Update a causa
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Escrito content can not be empty"
        });
    }
    Escrito.findByIdAndUpdate(req.params.escritoId, {
      nombreArchivo : req.body.nombreArchivo,
      nombre : req.body.nombre,
      fecha : req.body.fecha,
      fechaLimite : req.body.fechaLimite,
      index : req.body.index,
      sucursal : req.body.sucursal,
      area : req.body.area,
      revisor : req.body.revisor,
      observaciones : req.body.observaciones,
      estado : req.body.estado,
    }, {new: true})
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.escritoId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.escritoId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.escritoId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Escrito.findByIdAndRemove(req.params.escritoId)
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "Escrito no encontrado id " + req.params.escritoId
            });
        }
        res.send({message: "Escrito borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Escrito no encontrado id " + req.params.escritoId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el Escrito id " + req.params.escritoId
        });
    });
};
