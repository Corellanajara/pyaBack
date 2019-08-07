module.exports = (app) => {
    const documentos = require('./documento.controller.js');

    app.post('/documentosFile', documentos.createdocumento);

    app.post('/documentos', documentos.create);

    app.get("/documentos",documentos.findAll);

    app.put('/documentos/:documentoId', documentos.update);

    app.delete('/documentos/:documentoId', documentos.delete);
}
