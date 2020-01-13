// import express from 'express'; // ES2015 module syntax
const express = require('express'); //CommonJS modules

const Hubs = require('./data/hubs-model');

const server = express();

server.use(express.json()); // needed to parse JSON

// routes or endpoints

// GET to '/'
server.get('/', function(request, response) {
    response.send({hello: 'Web 25!'});
});

// Fetch a list of hubs
server.get('/api/hubs', (req, res) => {
    // read the data from the database (Hubs)
    Hubs.find() // return a promise
        .then(hubs => {
            console.log('Hubs', hubs);
            res.status(200).json(hubs);
        })
        .catch(err => {
            console.log(err);
            // handle the error
            res.status(500).json({ errorMessage: "sorry, we ran into an error getting the list of hubs"})
        })
})

// Create a hub
server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
      .then(hub => {
        res.status(201).json(hub);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error creating the hub',
        });
      });
  });

// Delete a hub
server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
      .then(deleted => {
        // res.status(204).end();
        res.status(200).json(deleted);
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the hub',
        });
      });
  });

// Update a hub

const port = 8000;
server.listen(port, () => console.log(`\n **api on port: ${port}**  \n`));

// "npm i express" (no quotes) to install the express library
// to run the server type: npm run server

// to solve sqlite3 error just do npm i sqlite3