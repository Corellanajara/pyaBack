const Juridisccion = require('./juridisccion.model.js');

//Create new juridisccion
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const juridisccion = new Juridisccion({
      nombre: req.body.nombre,
      codigo : req.body.codigo,
    });

    // Save juridisccion in the database
    juridisccion.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las juridisccions."
        });
    });
};

// Retrieve all juridisccions from the database.
exports.findAll = (req, res) => {
    Juridisccion.find()
    .then(juridisccions => {
        res.send(juridisccions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las juridisccions."
        });
    });
};


// Find a single juridisccion with a juridisccionId
exports.findOne = (req, res) => {
    Juridisccion.find({ juridisccion : req.params.juridisccionId })
    .then(juridisccion => {
        if(!juridisccion) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.juridisccionId
            });
        }
        res.send(juridisccion);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado juridiscciono  " + req.params.juridisccionId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.juridisccionId
        });
    });
};



// Update a juridisccion
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "juridisccion content can not be empty"
        });
    }

    // Find and update juridisccion with the request body
    Juridisccion.findByIdAndUpdate(req.params.juridisccionId, {
      nombre: req.body.nombre,
      codigo : req.body.codigo,
    }, {new: true})
    .then(juridisccion => {
        if(!juridisccion) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.juridisccionId
            });
        }
        res.send(juridisccion);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.juridisccionId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.juridisccionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Juridisccion.findByIdAndRemove(req.params.juridisccionId)
    .then(juridisccion => {
        if(!juridisccion) {
            return res.status(404).send({
                message: "juridiscciono no encontrado id " + req.params.juridisccionId
            });
        }
        res.send({message: "juridiscciono borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "juridiscciono no encontrado id " + req.params.juridisccionId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el juridiscciono id " + req.params.juridisccionId
        });
    });
};
