module.exports = (app) => {
    const materias = require('./materia-causa.controller.js');

    app.post('/causa/materias', materias.create);

    app.get('/causa/materias', materias.findAll);

    app.get('/causa/materias/:sucursalId/' , materias.findMateriasBySucursal);

    app.put('/causa/materias/:materiaId', materias.update);

    app.delete('/causa/materias/:materiaId', materias.delete);
}
