module.exports = (app) => {
    const causas = require('./causa.controller.js');

    app.post('/causas', causas.create);

    app.post('/causas/condicion/',causas.findByCondicion);

    app.get('/causas', causas.findAll);

    app.get('/causas/nuevas' , causas.getLast15 );

    app.post('/causas/reporte' , causas.getReporte );

    app.get('/causas/:causaId', causas.findOne);

    app.post('/causas/materia/:sucursalId', causas.findByMateria);

    app.put('/causas/:causaId', causas.update);

    app.delete('/causas/:causaId', causas.delete);
}
