// Setup empty JS object to act as endpoint for all routes
projectData = [];

const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(express.static('dist'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

console.log(__dirname)
// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile('dist/index.html')
})
app.get('/all', function(req, res){
  res.send(projectData);
})
app.post('/tripp/add', function (req, res){
  try{
      const data = {
        city: req.body.city, 
        geoData: req.body.geoData,
        start: req.body.start,
        end: req.body.end
      }
      projectData.push(data)
      console.log(data)
  }catch (error){
      console.log("Error: ", error)
  }  
})