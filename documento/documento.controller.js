const Documento = require('./documento.model.js');
const fs   = require('fs');

exports.createdocumento = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }
    let archivo = req.files.file;

    let path = process.cwd()+'/archivos/documentos/'+req.body.tipo;
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

    const documento = new Documento({
        nombre : req.body.nombre,
        nombreArchivo : req.body.nombreArchivo,
        tipo : req.body.tipo,
        estado : req.body.estado || 1,
    });

    documento.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear el archivo."
        });
    });
};
exports.findAll = (req,res) => {
  Documento.find()
  .then(Arancels => {
      res.send(Arancels);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error en traer los Arancels."
      });
  });
}


// Update a causa
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Arancel content can not be empty"
        });
    }
    Documento.findByIdAndUpdate(req.params.ArancelId, {
      nombre : req.body.nombre,
      nombreArchivo : req.body.nombreArchivo,
      tipo : req.body.tipo,
      estado : req.body.estado || 1,
    }, {new: true})
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.documentoId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.documentoId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.documentoId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Documento.findByIdAndRemove(req.params.documentoId)
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "documento no encontrado id " + req.params.documentoId
            });
        }
        res.send({message: "documento borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "documento no encontrado id " + req.params.documentoId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el documento id " + req.params.documentoId
        });
    });
};
