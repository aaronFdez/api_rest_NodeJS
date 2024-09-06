'use strict'

var controller= {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Hola mundo desde mi API de NodeJS Index'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Hola mundo desde mi API de NodeJS Test'
        });
    }
};

module.exports = controller;