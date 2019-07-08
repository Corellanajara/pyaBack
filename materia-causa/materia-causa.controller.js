const Materia = require('./materia-causa.model.js');

//Create new materia
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const materia = new Materia({
      sucursal : req.body.sucursal,
      sucursal_code : req.body.sucursal_code,
      title: req.body.title || "Sin titulo",
      title_code : req.body.title_code,
      materia_code : req.body.materia_code ,
      users : req.body.users,
    });

    // Save materia in the database
    materia.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los materias."
        });
    });
};

// Retrieve all materias from the database.
exports.findAll = (req, res) => {
    Materia.find()
    .then(materias => {
        res.send(materias);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer los materias."
        });
    });
};


// Find materia by sucursal
exports.findMateriasBySucursal = (req, res) => {
    Materia.find({ sucursal : req.params.sucursalId })
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado materia  " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.materiaId
        });
    });
};

// Find a single materia with a materiaId
exports.findOne = (req, res) => {
    materia.findById(req.params.materiaId)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado materia  " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.materiaId
        });
    });
};
// Find materia by materia
exports.findByMateria = (req, res) => {
    Materia.find({ materia : req.params.materiaId })
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado materia  " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.materiaId
        });
    });
};
// Update a materia
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "materia content can not be empty"
        });
    }

    // Find and update materia with the request body
    Materia.findByIdAndUpdate(req.params.materiaId, {
        sucursal : req.body.sucursal,
        sucursal_code : req.body.code,
        title: req.body.title || "Sin titulo",
        title_code : req.body.title_code,
        materia_code : req.body.materia_code ,
        users : req.body.users
    }, {new: true})
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.materiaId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Materia.findByIdAndRemove(req.params.materiaId)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "materia no encontrado id " + req.params.materiaId
            });
        }
        res.send({message: "materia borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "materia no encontrado id " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el materia id " + req.params.materiaId
        });
    });
};
