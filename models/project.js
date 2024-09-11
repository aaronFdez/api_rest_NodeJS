'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

// mongoose coge en name lo pone en minusculas y plural "projects" que coincide con el de mongo
module.exports = mongoose.model('Project', ProjectSchema);
// projects --> guarda los documents en la colección