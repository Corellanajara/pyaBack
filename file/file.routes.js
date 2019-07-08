module.exports = (app) => {
    const files = require('./file.controller.js');

    app.post('/files', files.create);

    app.get('/files', files.findAll);

    app.get('/files/:fileId', files.findOne);

    app.post('/files/validar/', files.findUser);

    app.put('/files/:fileId', files.update);

    app.delete('/files/:fileId', files.delete);
}
