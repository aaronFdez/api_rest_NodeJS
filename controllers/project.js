'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
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
                return res.status(404).send({message: 'No se ha podido guardar el documento'});
            }
            return res.status(200).send({project: projectStored});
        } catch (err) {
            return res.status(500).send({message: 'Error al guardar el documento'});
        }
    },
    getProject: async function (req, res) {
        var projectId = req.params.id;
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).send({message: 'No se ha encontrado el proyecto'});
            }
            return res.status(200).send({project});
        } catch (err) {
            return res.status(500).send({message: 'Error al obtener el proyecto'});
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
    },
    updateProject: async function (req, res) {
        var projectId = req.params.id;
        var update = req.body;
        try {
            const project = await Project.findByIdAndUpdate(projectId, update, {new: true});
            if (!project) {
                return res.status(404).send({message: 'No se ha encontrado el proyecto'});
            }
            return res.status(200).send({project});
        } catch (err) {
            return res.status(500).send({message: 'Error al actualizar el proyecto'});
        }
    },
    deleteProject: async function (req, res) {
        var projectId = req.params.id;
        try {
            const project = await Project.findByIdAndDelete(projectId);
            if (!project) {
                return res.status(404).send({message: 'No se ha encontrado el proyecto'});
            }
            return res.status(200).send({project});
        } catch (err) {
            return res.status(500).send
        }
    },
    uploadImage: async function (req, res) {
        const projectId = req.params.id;

        if (!req.files) {
            return res.status(400).send({message: 'No se ha subido ninguna imagen'});
        }

        const filePath = req.files.image.path;

        try {
            const project = await Project.findByIdAndUpdate(projectId, {image: filePath}, {new: true});
            if (!project) {
                return res.status(404).send({message: 'No se ha encontrado el proyecto'});
            }
            return res.status(200).send({project});
        } catch (err) {
            return res.status(500).send({message: 'Error al actualizar el proyecto'});
        }
    },
    getImageFile: function (req, res) {
        const file = req.params.image;
        const path_file = path.resolve('./uploads', file);

        fs.access(path_file, fs.constants.F_OK, (err) => {
            if (err) {
                const pathNoImage = path.resolve('./uploads/images/no-image.jpg');
                return res.sendFile(pathNoImage);
            }
            return res.sendFile(path_file);
        });
    }
};

module.exports = controller;