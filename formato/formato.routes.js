module.exports = (app) => {
    const formatos = require('./formato.controller.js');

    app.post('/formatosFile', formatos.createFormato);

    app.post('/formatos', formatos.create);

    app.get('/formatos/internos', formatos.findInternos);
    app.get('/formatos/tramitacion', formatos.findTramitacion);

    app.put('/formatos/:formatoId', formatos.update);

    app.delete('/formatos/:formatoId', formatos.delete);
}
