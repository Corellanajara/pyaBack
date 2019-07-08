module.exports = (app) => {
    const materias = require('./materia.controller.js');

    app.post('/materias/', materias.create);

    app.get('/materias/', materias.findAll);

    app.get('/materias/:materiaId', materias.findOne);

    app.get('/materias/juridisccion/:juridisccionId', materias.findByJuridisccion);

    app.put('/materias/:materiaId', materias.update);

    app.delete('/materias/:materiaId', materias.delete);
}
