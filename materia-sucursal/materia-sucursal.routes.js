module.exports = (app) => {
    const materias = require('./materia-sucursal.controller.js');

    app.post('/sucursal/materias', materias.create);

    app.get('/sucursal/materias', materias.findAll);

    app.get('/sucursal/:sucursalId', materias.findBySucursal);

    app.get('/sucursal/materias/:materiaId', materias.findOne);

    app.put('/sucursal/materias/:materiaId', materias.update);

    app.delete('/sucursal/materias/:materiaId', materias.delete);
}
