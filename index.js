'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio').then(()=>{
    console.log('Conectado a la base de datos enn');
    // Creacion del servicio
    app.listen(port, () => {
        console.log('Servidor corriendo en http://localhost:3700');
    });
}).catch(err => {
    console.log(err);
});

