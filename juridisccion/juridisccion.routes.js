module.exports = (app) => {
    const juridisccions = require('./juridisccion.controller.js');

    app.post('/juridisccions/', juridisccions.create);

    app.get('/juridisccions/', juridisccions.findAll);

    app.get('/juridisccions/:juridisccionId', juridisccions.findOne);    

    app.put('/juridisccions/:juridisccionId', juridisccions.update);

    app.delete('/juridisccions/:juridisccionId', juridisccions.delete);
}
