const File = require('./File.model.js');

//Create new File
exports.create = (req, res) => {

    console.log("files",req.files);

    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

/*
    const file = new File({
      Nombres : req.body.Nombres,
      ApellidoMaterno : req.body.ApellidoMaterno,
      ApellidoPaterno : req.body.ApellidoPaterno,
      Correo : req.body.Correo,
      Direccion : req.body.Direccion,
      Numero : req.body.Numero,
      Rol : req.body.Rol,
      Clave : req.body.Clave,
    });

    file.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las Filees."
        });
    });
    */
};

// Retrieve all Filees from the database.
exports.findAll = (req, res) => {
    File.find()
    .then(Filees => {
        res.send(Filees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las Filees."
        });
    });
};

exports.findUser = (req, res) => {
    File.find( {Correo : req.body.Correo , Clave : req.body.Clave } )
    .then(File => {
        if(!File) {
            return res.status(404).send({
                message: "No se encontro File"
            });
        }
        res.send(File);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado correo   " + req.body.Correo
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar el File "
        });
    });
};
// Find a single File with a FileId
exports.findOne = (req, res) => {
    File.findById(req.params.FileId)
    .then(File => {
        if(!File) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.FileId
            });
        }
        res.send(File);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado File  " + req.params.FileId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.FileId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "File content can not be empty"
        });
    }

    File.findByIdAndUpdate(req.params.FileId, {
      Nombres : req.body.Nombres,
      ApellidoMaterno : req.body.ApellidoMaterno,
      ApellidoPaterno : req.body.ApellidoPaterno,
      Correo : req.body.Correo,
      Direccion : req.body.Direccion,
      Numero : req.body.Numero,
      Rol : req.body.Rol,
      Clave : req.body.Clave,
    }, {new: true})
    .then(File => {
        if(!File) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.FileId
            });
        }
        res.send(File);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.FileId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.FileId
        });
    });
};

exports.delete = (req, res) => {
    File.findByIdAndRemove(req.params.FileId)
    .then(File => {
        if(!File) {
            return res.status(404).send({
                message: "File no encontrado id " + req.params.FileId
            });
        }
        res.send({message: "File borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "File no encontrado id " + req.params.FileId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el File id " + req.params.FileId
        });
    });
};
