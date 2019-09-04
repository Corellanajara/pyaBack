module.exports = (app) => {
    const escritos = require('./escrito.controller.js');

    app.post('/escritosFile', escritos.createEscrito);

    app.post('/escritos', escritos.create);

    app.get("/escritos",escritos.findAll);

    app.get("/escritos/causa",escritos.findByCausa);

    app.put('/escritos/:escritoId', escritos.update);

    app.delete('/escritos/:escritoId', escritos.delete);
}
