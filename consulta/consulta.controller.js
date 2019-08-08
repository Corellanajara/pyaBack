const Consulta = require('./consulta.model.js');
const fs   = require('fs');

exports.createConsulta = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }
    let archivo = req.files.file;

    let path = process.cwd()+'/archivos/consultas/ficha/'+req.body.fecha+'/'+req.body.area;

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

    const consulta = new Consulta({
        nombreArchivo : req.body.nombreArchivo,
        nombreReferido : req.body.nombreReferido,
        nombreCaptador : req.body.nombreCaptador,
        area : req.body.area,
        sede : req.body.sede,
        fecha : req.body.fecha,
    });

    consulta.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear el archivo."
        });
    });
};
exports.findAll = (req,res) => {
  Consulta.find()
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
    Consulta.findByIdAndUpdate(req.params.consultaId, {
      nombreArchivo : req.body.nombreArchivo,
      nombreReferido : req.body.nombreReferido,
      nombreCaptador : req.body.nombreCaptador,
      area : req.body.area,
      sede : req.body.sede,
      fecha : req.body.fecha,
    }, {new: true})
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.consultaId
            });
        }
        res.send(causa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.consultaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.consultaId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Consulta.findByIdAndRemove(req.params.consultaId)
    .then(causa => {
        if(!causa) {
            return res.status(404).send({
                message: "Consulta no encontrado id " + req.params.consultaId
            });
        }
        res.send({message: "Consulta borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Consulta no encontrado id " + req.params.consultaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el Consulta id " + req.params.consultaId
        });
    });
};
