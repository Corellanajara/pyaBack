const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');


// necesarios
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Activar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const config = require('./config.js');
const mongoose = require('mongoose');

require('./juridisccion/juridisccion.routes.js')(app);
require('./materia/materia.routes.js')(app);
require('./causa/causa.routes.js')(app);
require('./file/file.routes.js')(app);
require('./formato/formato.routes.js')(app);
require('./documento/documento.routes.js')(app);
require('./arancel/arancel.routes.js')(app);
require('./parte/parte.routes.js')(app);
require('./usuario/usuario.routes.js')(app);
require('./estudio/estudio.routes.js')(app);
require('./sucursal/sucursal.routes.js')(app);
require('./materia-sucursal/materia-sucursal.routes.js')(app);
require('./materia-causa/materia-causa.routes.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.log('No se pudo conectar... Saliendo de la base de datos', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "APi Protección y Amparo"});
});

app.listen(config.serverport, () => {
    console.log("Escuchando al puerto "+config.serverport);
});
