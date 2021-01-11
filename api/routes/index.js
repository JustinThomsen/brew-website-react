var express = require('express');
var path = require('path');
var router = express.Router();
const AWS = require('aws-sdk');
let directory = path.join(__dirname, '..', '..', 'app', 'build');
let beverages = require('../public/data/beverages.json');

let apikey = process.env.BREW_KEY;
const axios = require('axios');
axios.defaults.headers.common['X-API-Key'] = apikey;

let ankeny = {};
let bettendorf = {};

AWS.config.update({
  accessKeyId: process.env.AWS_IAM,
  secretAccessKey: process.env.AWS_PWD,
  region: 'us-west-2',
});

const s3 = new AWS.S3();

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
  this.bettendorf = retrieveFile('bettendorf.json')
    .then(response => {
      this.bettendorf = response;
      res.send(this.bettendorf);
    }, (error) => {
      console.log(error);
    });
});
router.get('/api/beverages', function (req, res) {
  res.send(beverages);
});
router.get('/api/ankeny', function (req, res) {
  this.ankeny = retrieveFile('ankeny.json')
    .then(response => {
      this.ankeny = response;
      res.send(this.ankeny);
    }, (error) => {
      console.log(error);
    });
});

router.get('/api/fermentationDetails/', function (req, res) {
  let brewSessions = getBrewsessions();
  brewSessions
    .then((result) => {
      let beerFermentationStatus = getFermentationDataByBeerName(result, req.query.name);
      res.send(JSON.stringify(beerFermentationStatus));
    });
});

async function retrieveFile(filename, res) {

  try {
    const getParams = {
      Bucket: 'elasticbeanstalk-us-west-2-381871787484',
      Key: filename
    };

    let response = await s3.getObject(getParams)
      .promise();
    let beerListAsJson = JSON.parse(response.Body);
    return beerListAsJson;

  } catch (err) {
    return res.status(400)
      .send({
        success: false,
        err: err
      });
  }
}

async function getBrewsessions() {
  let sessions = await axios.get('/v1/brewsessions', { baseURL: 'https://api.brewersfriend.com' })
    .then(response => {
      return response.data;
    }, (error) => {
      console.log(error);
    });
  return sessions.brewsessions;
}

function getFermentationDataByBeerName(brewSessions, beerName) {
  let beerData = brewSessions.filter(session => session.recipe_title === beerName);
  return beerData;
}

module.exports = router;
