// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000
const server = app.listen(port, () => { console.log(`Listening to port: ${port}`) })

/* Routes */
// Get route to acquire data from server
app.get('/get', (req, res) =>{ 
    res.send(projectData)
})

// Post route to Save data to the server
app.post('/post', (req, res) =>{ 
    projectData = {
        date : req.body.date,
        temperature : req.body.temperature,
        text : req.body.text,
    }
    res.send(projectData)
    console.log(projectData)
})