module.exports = (app) => {
    const aranceles = require('./arancel.controller.js');

    app.post('/arancelesFile', aranceles.createarancel);

    app.post('/aranceles', aranceles.create);

    app.get("/aranceles",aranceles.findAll);

    app.get('/aranceles/internos', aranceles.findInternos);
    app.get('/aranceles/tramitacion', aranceles.findTramitacion);

    app.put('/aranceles/:arancelId', aranceles.update);

    app.delete('/aranceles/:arancelId', aranceles.delete);
}
