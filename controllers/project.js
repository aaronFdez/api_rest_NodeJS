'use strict'
var Project = require('../models/project');

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
    },
    saveProject: async function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        try {
            const projectStored = await project.save();  // Esperar a que se guarde el proyecto
            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el documento' });
            }
            return res.status(200).send({ project: projectStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar el documento' });
        }
    },


    getProjects: async function (req, res) {
        try {
            const projects = await Project.find();
            if (!projects) {
                return res.status(404).send({message: 'No se han encontrado proyectos'});
            }
            return res.status(200).send({projects});
        } catch (err) {
            return res.status(500).send({message: 'Error al obtener los proyectos'});
        }
    }
};

module.exports = controller;