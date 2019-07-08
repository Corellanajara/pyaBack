module.exports = (app) => {
    const causas = require('./causa.controller.js');

    app.post('/causas', causas.create);

    app.get('/causas', causas.findAll);

    app.get('/causas/:causaId', causas.findOne);

    app.post('/causas/materia/:sucursalId', causas.findByMateria);    

    app.put('/causas/:causaId', causas.update);

    app.delete('/causas/:causaId', causas.delete);
}
