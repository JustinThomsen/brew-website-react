const express = require('express');

const path = require('path');

const router = express.Router();
const AWS = require('aws-sdk');

const directory = path.join(__dirname, '..', '..', 'app', 'build');
const axios = require('axios');

const apikey = process.env.BREW_KEY;
const beverages = require('../public/data/beverages.json');

const serverPassword = process.env.UPDATE_PWD;
//the password is just going to be sent in the json which probably means someone could figure it out when the right
//password is sent, maybe based on the response?  Should I encrypt it somehow?
//my errors suck - I dont know how to build HTTP responses
//also don't know the best way to return a view or if I actually should (on error condition I get the views dont
//exist error

//its probably also time to start learning testing but wanted to focus on learning the basics first

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
      Bucket: 'magic-bean-jsons',
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
//probably a better way to refactor this - making 2 api calls somehow
async function postJSONUpdate(object) {
  try {
    const ankenyAsString = JSON.stringify(object.ankeny);
    const bettendorfAsString = JSON.stringify(object.bettendorf);
    const getParamsAnkeny = {
      Bucket: 'magic-bean-jsons',
      Key: 'pwd.json',
      Body: ankenyAsString,
    };
    const getParamsBettendorf = {
      Bucket: 'magic-bean-jsons',
      Key: 'pwd2.json',
      Body: bettendorfAsString,
    };

    const ankenyResponse = await s3.putObject(getParamsAnkeny).promise();
    const bettendorfResponse = await s3.putObject(getParamsBettendorf).promise();

    const response = [ankenyResponse, bettendorfResponse];
    return response;
  } catch (err) {
    return err;
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

router.post('/api/update', async (req, res) => {
  const { password } = req.body[0];
  try {
    if (password === serverPassword) {
      const response = await postJSONUpdate(req.body[0]);
      res.status(200).send({
        success: true,
        response,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
    });
  }
  if (password !== serverPassword) {
    res.status(401).send({
    });
  }
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
