// implement your API here
const express = require('express');

const Elements = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', function(request, response) {
    response.send({hello: "server runing"});
});

server.get('/api/elements', (req, res) => {
    Elements.find()
        .then(elements => {
            console.log("Elements:", elements);
            res.status(200).json(elements);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "sorry, we run into an error to get the list of elements"})
        })
})

server.get('/api/elements/:id', (req, res) => {
    const id = req.params.id;

    Elements.findById(id)
    .then(elements => {
        console.log("Elements:", elements);
        res.status(200).json(elements);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: "sorry, we run into an error finding that id"})
    })

})

server.post('/api/elements', (req, res) => {
    const elementData = req.body;

    Elements.insert(elementData)
        .then(element => {
            res.status(201).json(element);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "sorry, we run into an error creating the new object"});
        })
})

const port = 8000;
server.listen(port, () => console.log(`\n *** api on port: ${port} *** `))