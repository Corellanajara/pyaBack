module.exports = (app) => {
    const documentos = require('./documento.controller.js');

    app.post('/documentosFile', documentos.createdocmento);

    app.post('/documentos', documentos.create);

    app.get("/documentos",documentos.findAll);

    app.put('/documentos/:docmentoId', documentos.update);

    app.delete('/documentos/:docmentoId', documentos.delete);
}
