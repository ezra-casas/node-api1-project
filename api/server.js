// BUILD YOUR SERVER HERE
const express = require('express');
// import model
const Model = require('./users/model');
const server = express();

server.use(express.json());

server.get('/', (require, reponse) => {
    response.end('<h1>Welcome to the Project App</h1>')
})

server.get('/api/users', (request, response) => {
    Model.find()
        .then(models => {
            response.json(models);
        })
        .catch(error => {
            response.status(500).json({message: "The users information could not be retrieved"})
        })
})

server.post('/api/users/', async (request, response)=> {
    let {name, bio} = request.body;
    let model = request.body;

    if(name && bio){
        Model.insert(model)
            .then(element => {
                response.status(201).json(element);
            })
    }else{
        console.log(model);
        response.status(400).json({ message: "Please provide name and bio for the user"});
    }
})

server.get('/api/users/:id', (requesst, response) => {
    Model.findById(requesst.params.id)
        .then(model => {
            if(!model) {
                response.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else {
                response.json(model);
            }
        })
        .catch(err => {
            response.status(500).json({message: 'The user information could not be retrieved'})
        });
});

server.put('/api/users/:id', (request, response) => {
    let id = request.params.id;
    let model = request.body;
    Model.update(id, model)
        .then(updatedUser => {
            if(!updatedUser) {
                response.status(404).json({ message: 'The user with the specified ID does not exist' })
            } else if(!request.body.name || !request.body.bio) {
                response.status(400).json({message: 'Please provide name and bio for the'})
            }
            else {
                response.status(200).json(updatedUser)
            }
        })
})
server.delete('/api/users/:id', (request, response) => {
    Model.remove(request.params.id)
        .then(user => {
            if(!user) {
                response.status(404).json({ message: "The user with the specified ID does not exist" })
            }
            else {
                response.json(user)
            }
        })
        .catch(err => {
            response.status(500).json({ message: 'The user could not be removed' })
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
