module.exports = (app) => {
    const consultas = require('./consulta.controller.js');

    app.post('/consultasFile', consultas.createConsulta);

    app.post('/consultas', consultas.create);

    app.get("/consultas",consultas.findAll);

    app.put('/consultas/:consultaId', consultas.update);

    app.delete('/consultas/:consultaId', consultas.delete);
}
