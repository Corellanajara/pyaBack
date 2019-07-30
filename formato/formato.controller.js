const Formato = require('./formato.model.js');
const fs   = require('fs');

exports.createFormato = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }
    let archivo = req.Formatos.Formato;

    let path = process.cwd()+'/archivos/formatos/'+req.body.tipo;
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

    const formato = new Formato({
        nombre : req.body.nombre,
        tipo : req.body.tipo

    });

    formato.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear el archivo."
        });
    });
};


// Find a single causa with a causaId
exports.findTramitacion = (req, res) => {


    Formato.find({ tipo : "tramitacion" })
    .then(formato => {
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

exports.findInternos = (req, res) => {


    Formato.find({ tipo : "internos" })
    .then(formato => {
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


// Update a causa
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "formato content can not be empty"
        });
    }
    Formato.findByIdAndUpdate(req.params.formatoId, {
      nombre : req.body.nombre,
      tipo : req.body.tipo
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
    Formato.findByIdAndRemove(req.params.formatoId)
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
