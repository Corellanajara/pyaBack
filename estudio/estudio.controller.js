const Estudio = require('./estudio.model.js');

//Create new estudio
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const estudio = new Estudio({
      title: req.body.title,
      users : req.body.users
    });

    // Save estudio in the database
    estudio.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las estudios."
        });
    });
};

// Retrieve all estudios from the database.
exports.findAll = (req, res) => {
    Estudio.find()
    .then(estudios => {
        res.send(estudios);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las estudios."
        });
    });
};

// Find a single estudio with a estudioId
exports.findByestudio = (req, res) => {
    Estudio.find({ estudio_actual : req.params.estudioId })
    .then(estudio => {
        if(!estudio) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.estudioId
            });
        }
        res.send(estudio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado estudioo  " + req.params.estudioId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.estudioId
        });
    });
};

// Find a single estudio with a estudioId
exports.findOne = (req, res) => {
    Estudio.find({ estudio : req.params.estudioId })
    .then(estudio => {
        if(!estudio) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.estudioId
            });
        }
        res.send(estudio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado estudioo  " + req.params.estudioId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.estudioId
        });
    });
};

// Update a estudio
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "estudio content can not be empty"
        });
    }

    // Find and update estudio with the request body
    Estudio.findByIdAndUpdate(req.params.estudioId, {
        title: req.body.title,
        users : req.body.users
    }, {new: true})
    .then(estudio => {
        if(!estudio) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.estudioId
            });
        }
        res.send(estudio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.estudioId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.estudioId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Estudio.findByIdAndRemove(req.params.estudioId)
    .then(estudio => {
        if(!estudio) {
            return res.status(404).send({
                message: "estudioo no encontrado id " + req.params.estudioId
            });
        }
        res.send({message: "estudioo borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "estudioo no encontrado id " + req.params.estudioId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el estudioo id " + req.params.estudioId
        });
    });
};
