module.exports = (app) => {
    const estudios = require('./estudio.controller.js');

    app.post('/estudios/', estudios.create);

    app.get('/estudios/', estudios.findAll);

    app.get('/estudios/:estudioId', estudios.findOne);

    app.put('/estudios/:estudioId', estudios.update);

    app.delete('/estudios/:estudioId', estudios.delete);
}
