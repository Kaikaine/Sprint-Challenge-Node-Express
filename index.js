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

    actionDb.get(id).then(user => {
        res.status(200).json(user)
    })
        .catch(err => res.status(404).json({ message: "The user with the specified ID does not exist." }))
})

server.post('/actions', (req, res) => {
    actionDb.insert(req.body)
        .then(response => res.status(201).json({ message: 'user creation success' }))
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
        .catch(err => res.status(500).json({ message: 'user update fail' }))
})


// project

// start the server
server.listen(6000, () => console.log('API On Port 6000'));
