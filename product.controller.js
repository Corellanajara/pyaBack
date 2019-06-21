const Product = require('./product.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const product = new Product({
        title: req.body.title || "Sin titulo",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los productos."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer los productos."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado producto  " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.productId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "Sin Titulo",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.productId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Producto no encontrado id " + req.params.productId
            });
        }
        res.send({message: "Producto borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Producto no encontrado id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el producto id " + req.params.productId
        });
    });
};
