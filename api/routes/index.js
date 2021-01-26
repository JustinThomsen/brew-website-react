const express = require('express');

const path = require('path');

const router = express.Router();
const AWS = require('aws-sdk');

const directory = path.join(__dirname, '..', '..', 'app', 'build');
const axios = require('axios');

const apikey = process.env.BREW_KEY;
const beverages = require('../public/data/beverages.json');

const serverPassword = process.env.UPDATE_PWD;

axios.defaults.headers.common['X-API-Key'] = apikey;

AWS.config.update({
  accessKeyId: process.env.AWS_IAM,
  secretAccessKey: process.env.AWS_PWD,
  region: 'us-west-2',
});

const s3 = new AWS.S3();
// probably a better way to refactor this - making 2 api calls somehow
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

router.get('/api/beverages', (req, res) => {
  res.send(beverages);
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

router.get('/api/ankeny', (req, res) => {
  let ankeny = retrieveFile('ankeny.json')
    .then((response) => {
      ankeny = response;
      res.send(ankeny);
    }, (error) => {
      console.log(error);
    });
});

async function postJSONUpdate(object) {
  try {
    const ankenyAsString = JSON.stringify(object.ankeny, null, 2);
    const bettendorfAsString = JSON.stringify(object.bettendorf, null, 2);
    const getParamsAnkeny = {
      Bucket: 'magic-bean-jsons',
      Key: 'ankeny.json',
      ContentType: 'application/json',
      Body: ankenyAsString,
    };
    const getParamsBettendorf = {
      Bucket: 'magic-bean-jsons',
      Key: 'bettendorf.json',
      ContentType: 'application/json',
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

async function getBrewSessions() {
  try {
    const sessions = await axios.get('/v1/brewsessions', { baseURL: 'https://api.brewersfriend.com' });
    return sessions.data;
  } catch (err) {
    console.log(err);
  }
  return {};
}

async function getStatsByBrewSessionID(sessionID) {
  try {
    const fermentData = await axios.get(`/v1/fermentation/${sessionID}`, { baseURL: 'https://api.brewersfriend.com' });
    return fermentData.data;
  } catch (err) {
    console.log(err);
  }
  return {};
}

async function getLatestBrewSessionFermentationDataByRecipeID(recipeID) {
  try {
    const recipeData = await axios.get(`/v1/recipes/${recipeID}`, { baseURL: 'https://api.brewersfriend.com' });
    const brewSessions = JSON.parse(recipeData.data.recipes[0].brew_sessions);
    const lastIndex = parseInt(brewSessions.length - 1);
    const sessionId = brewSessions[lastIndex].breweventid;
    return await getStatsByBrewSessionID(sessionId);
  } catch (err) {
    console.log(err);
  }
  return {};
}

function getFermentationDataForBrewSessionsByRecipeID(brewSessions, recipeid) {
  try {
    const fermentationdata = brewSessions.filter((session) => session.recipeid === recipeid);
    return fermentationdata;
  } catch (err) {
    console.log(err);
  }
  return {};
}
// get session with recipeid
// get latest reading from the session

router.get('/api/fermentationDetails/', async (req, res) => {
  async function getReadingForRecipe(recipeid) {
    const brewSessions = await getBrewSessions();
    const sessions = brewSessions.brewsessions;
    const beerFermentationStatus = await getFermentationDataForBrewSessionsByRecipeID(sessions, recipeid);// req.query.recipeid
    if (recipeid === ""){
      return {};
    }
    const deviceReading = JSON.parse(beerFermentationStatus[0].device_reading);
    const latestReading = deviceReading.last_reading;
    return latestReading;
  }
  try {
    const ankeny = await retrieveFile('ankeny.json');
    const fermenting = ankeny.filter((beer) => beer.type === 'fermenting');
    const beersFermenting = fermenting.flatMap(
      (beer) => beverages.filter((beverage) => beverage.id === beer.beveragesid),
    );
    const recipesFermenting = beersFermenting.map((beer) => beer.recipeid);
    const getReadingsFromRecipes = async () => Promise.all(recipesFermenting.map(
      (recipe) => getReadingForRecipe(recipe),
    ));
    getReadingsFromRecipes().then((data) => res.send(JSON.stringify(data, null, 2)));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/api/brewsession/', async (req, res) => {
  try {
    const fermentationStats = await getStatsByBrewSessionID(req.query.sessionId);
    res.send(JSON.stringify(fermentationStats, null, 2));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/api/latestpoint/', async (req, res) => {
  try {
    const fermentationStats = await getLatestBrewSessionFermentationDataByRecipeID(req.query.recipeid);
    const stats = fermentationStats.readings;
    res.send(JSON.stringify(stats, null, 2));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
