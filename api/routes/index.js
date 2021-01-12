const express = require('express');
const path = require('path');

const router = express.Router();
const AWS = require('aws-sdk');

const directory = path.join(__dirname, '..', '..', 'app', 'build');
const axios = require('axios');

const apikey = process.env.BREW_KEY;
const beverages = require('../public/data/beverages.json');

axios.defaults.headers.common['X-API-Key'] = apikey;

AWS.config.update({
  accessKeyId: process.env.AWS_IAM,
  secretAccessKey: process.env.AWS_PWD,
  region: 'us-west-2',
});

const s3 = new AWS.S3();

async function retrieveFile(filename, res) {
  try {
    const getParams = {
      Bucket: 'elasticbeanstalk-us-west-2-381871787484',
      Key: filename,
    };

    const response = await s3.getObject(getParams)
      .promise();
    return JSON.parse(response.Body);
  } catch (err) {
    return res.status(400)
      .send({
        success: false,
        err,
      });
  }
}

async function getBrewSessions() {
  const sessions = await axios.get('/v1/brewsessions', { baseURL: 'https://api.brewersfriend.com' })
    .then((response) => response.data, (error) => {
      console.log(error);
    });
  return sessions.brewessions;
}

function getFermentationDataByBeerName(brewSessions, beerName) {
  return brewSessions.filter((session) => session.recipe_title === beerName);
}

router.use(express.static(directory));

router.get('/', (req, res) => {
  res.sendFile(path.join(directory, 'index.html'));
});

router.get('/ankeny', (req, res) => {
  res.sendFile(path.join(directory, 'index.html'));
});

router.get('/bettendorf', (req, res) => {
  res.sendFile(path.join(directory, 'index.html'));
});

router.get('/menu/', (req, res) => {
  res.sendFile(path.join(directory, 'index.html'));
});

router.get('/api/bettendorf', (req, res) => {
  let bettendorf = retrieveFile('bettendorf.json')
    .then((response) => {
      bettendorf = response;
      res.send(bettendorf);
    }, (error) => {
      console.log(error);
    });
});

router.get('/api/beverages', (req, res) => {
  res.send(beverages);
});

router.get('/api/ankeny', (req, res) => {
  let ankeny = retrieveFile('ankeny.json')
    .then((response) => {
      ankeny = response;
      res.send(ankeny);
    }, (error) => {
      console.log(error);
    });
});

router.get('/api/fermentationDetails/', (req, res) => {
  const brewSessions = getBrewSessions();
  brewSessions
    .then((result) => {
      const beerFermentationStatus = getFermentationDataByBeerName(result, req.query.name);
      res.send(JSON.stringify(beerFermentationStatus));
    });
});

module.exports = router;
