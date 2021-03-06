const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();
const actionDb = require('./data/helpers/actionModel');
const projectDb = require('./data/helpers/projectModel');

// add middleware



server.use(helmet())
server.use(express.json()); 

// configure routing

server.get('/', (req, res) => {
    res.send('Api running');
});

// actions

server.get('/actions', (req, res) => {

    actionDb.get().then(actions => {
        res.status(200).json(actions)
    })
        .catch(err => res.status(404).json({ message: "couldnt access actions" }))
})

server.get('/actions/:id',  (req, res) => {
    const {id} = req.params;

    actionDb.get(id).then(action => {
        res.status(200).json(action)
    })
        .catch(err => res.status(404).json({ message: "The action with the specified ID does not exist." }))
})

server.post('/actions', (req, res) => {
    actionDb.insert(req.body)
        .then(response => res.status(201).json({ message: 'action creation success' }))
        .catch(err => res.status(500).json(err))
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params

    actionDb.remove(id)
        .then(count => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'delete unsuccessful' }))
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.update(id, req.body)
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ message: 'action update fail' }))
})


// project

server.get('/project', (req, res) => {

    projectDb.get().then(project => {
        res.status(200).json(project)
    })
        .catch(err => res.status(404).json({ message: "couldnt access project" }))
})

server.get('/project/:id', (req, res) => {
    const {id} = req.params;

    projectDb.get(id).then(project => {
        res.status(200).json(project.id)
    })
        .catch(err => res.status(404).json({ message: "The project with the specified ID does not exist." }))
})

server.get('/project/:id/actions', (req, res) => {
    const {id} = req.params;


    projectDb.get(id).then(project => {
        // res.status(200).json(project)
        projectDb.getProjectActions(id).then(actions => {
            res.status(201).json(actions).catch(err => res.status(404).json(err))
        })
    })
        .catch(err => res.status(404).json({ message: "couldnt access project" }))
})

server.post('/project', (req, res) => {
    projectDb.insert(req.body)
        .then(response => res.status(201).json({ message: 'project creation success' }))
        .catch(err => res.status(500).json({ message: 'error creating project' }))
})

server.delete('/project/:id', (req, res) => {
    const { id } = req.params

    projectDb.remove(id)
        .then(count => res.status(204).json({message: 'delete successful'}).end())
        .catch(err => res.status(500).json({ message: 'delete unsuccessful' }))
})

server.put('/project/:id', (req, res) => {
    const { id } = req.params
    projectDb.update(id, req.body)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({ message: 'project update fail' }))
})


// start the server
server.listen(6000, () => console.log('API On Port 6000'));
