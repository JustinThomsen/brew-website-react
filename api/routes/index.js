var express = require('express');
var path = require('path');
var router = express.Router();

const AWS = require('aws-sdk');
const fs = require('fs');
let directory = path.join(__dirname, '..', '..', 'app', 'build');
let beverages = require("../public/data/beverages.json");

let apikey = process.env.BREW_KEY;
const axios = require('axios');
axios.defaults.headers.common['X-API-Key'] = apikey;

let ankeny = getLocationJSON("ankeny").then(response => {
  this.ankeny = response;
});

let bettendorf = getLocationJSON("bettendorf").then(response => {
  this.bettendorf = response;
});

/*
function retrieveFile(filename,res){

    const getParams = {
        Bucket: 'elasticbeanstalk-us-west-2-381871787484',
        Key: filename
    };

    s3.getObject(getParams, function(err, data) {
        if (err){
            return res.status(400).send({success:false,err:err});
        }
        else{
            console.log('needful');
            return res.send(data.Body);
        }
    });
}
*/

/*AWS.config.update({
    accessKeyId: process.env.iam_access_id,
    secretAccessKey: process.env.iam_secret,
    region: 'us-west-2',
});

const s3= new AWS.S3();*/

router.use(express.static(directory));

router.get('/', function (req, res) {
    res.sendFile(path.join(directory, 'index.html'));
});
router.get('/ankeny', function (req, res) {
    res.sendFile(path.join(directory, 'index.html'));
});
router.get('/bettendorf', function (req, res) {
    res.sendFile(path.join(directory, 'index.html'));
});
router.get('/menu/', function (req, res) {
    res.sendFile(path.join(directory, 'index.html'));
});
router.get('/api/bettendorf', function (req, res) {
  bettendorf = getLocationJSON("bettendorf").then(response => {
    this.bettendorf = response;
  });
  res.send(this.bettendorf);
});
router.get('/api/beverages', function (req, res) {
    res.send(beverages);
});
router.get('/api/ankeny', async (req, res) => {
  ankeny = getLocationJSON("ankeny").then(response => {
    this.ankeny = response;
  });
  res.send(this.ankeny);
});

router.get('/api/fermentationDetails/', function (req, res) {
    let brewSessions = getBrewsessions();
    brewSessions
        .then((result) => {
            let beerFermentationStatus = getFermentationDataByBeerName(result, req.query.name);
            res.send(JSON.stringify(beerFermentationStatus));
        });
});


async function getLocationJSON(location){
    let locationJSON ={};
    locationJSON = await axios.get("https://elasticbeanstalk-us-west-2-381871787484.s3-us-west-2.amazonaws.com/magic-bean-brewing/public/" + location + ".json")
        .then(response => {
            locationJSON = response.data;
            return response.data;
          },(error) => {
          console.log(error)
        });
    return locationJSON;
}

async function getBrewsessions() {
    let sessions = await axios.get('/v1/brewsessions', {baseURL: 'https://api.brewersfriend.com'})
        .then(response => {
            return response.data;
        }, (error) => {
            console.log(error)
        });
    return sessions.brewsessions;
}

function getFermentationDataByBeerName(brewSessions, beerName) {
    let beerData = brewSessions.filter(session => session.recipe_title === beerName);
    return beerData;
}

module.exports = router;
