// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', function(request, response) {
    response.send({hello: "server runing"});
});

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            console.log("Users:", users);
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    if(!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    Users.findById(id)
    .then(users => {
        console.log("Users:", users);
        res.status(200).json(users);
    })
    .catch(error => {
        console.log(error);
        
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })

})

server.post('/api/users', (req, res) => {
    const userData = req.body;
    const { name, bio } = req.body;

    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    Users.insert(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userInfo = req.body;
    
    Users.update(userId, userInfo)
        .then(updated => {
            res.status(204).json(updated)
            })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "The user information could not be modified." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(error =>{
            res.status(500).json({ errorMessage:'The user could not be removed' });
        })

})


const port = 8000;
server.listen(port, () => console.log(`\n *** api on port: ${port} *** `))