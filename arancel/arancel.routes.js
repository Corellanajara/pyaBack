module.exports = (app) => {
    const aranceles = require('./arancel.controller.js');

    app.post('/arancelesFile', aranceles.createArancel);

    app.post('/aranceles', aranceles.create);

    app.get("/aranceles",aranceles.findAll);    

    app.put('/aranceles/:arancelId', aranceles.update);

    app.delete('/aranceles/:arancelId', aranceles.delete);
}
