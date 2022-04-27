// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port,listening);
function listening(){
    console.log(`running on localhost:${port}`);
};


// 1. add get route that returns projectData and post route 
app.get('/all',sendData);

function sendData(request,response){
    response.send(projectData);
};

data=[]
app.post('/add',addData);
function addData(res,req){
    let data = req.body;
    projectData["temperature"] = data.temperature;
    projectData["data"] = data.date;
    projectData["user response"] = data.user_response;
    console.log(data);
}

