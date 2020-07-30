var express = require('express');
var path = require('path');
var router = express.Router();
let bettendorf = require("../public/data/bettendorf.json");
let beverages = require("../public/data/beverages.json");
let ankeny = require("../public/data/ankeny.json");
const axios = require('axios');
axios.defaults.headers.common['X-API-Key'] = '{BREW-KEY}';

let directory = path.join(__dirname, '..', '..', 'app', 'build');

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
    res.send(bettendorf);
});
router.get('/api/beverages', function (req, res) {
    res.send(beverages);
});
router.get('/api/ankeny', function (req, res) {
    res.send(ankeny);
});

router.get('/api/fermentationDetails/', function (req, res) {
    let brewSessions = getBrewsessions();
    brewSessions
        .then((result) => {
            let beerFermentationStatus = getFermentationDataByBeerName(result, req.query.name);
            res.send(JSON.stringify(beerFermentationStatus));
        });
});

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

