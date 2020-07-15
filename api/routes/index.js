var express = require('express');
var path = require('path');
var router = express.Router();
let bettendorf = require("../public/data/bettendorf.json");
let beverages = require("../public/data/beverages.json");
let ankeny = require("../public/data/ankeny.json");

let directory = path.join(__dirname, '..', '..', 'app', 'build');

router.use(express.static(directory));

router.get('/', function (req, res) {
  res.sendFile(path.join(directory, 'index.html'));
});
router.get('/ankeny', function(req, res) {
  res.sendFile(path.join(directory, 'index.html'));
});
router.get('/bettendorf', function(req, res) {
  res.sendFile(path.join(directory, 'index.html'));
});
router.get('/menu', function(req, res) {
  res.sendFile(path.join(directory, 'index.html'));
});
router.get('/api/bettendorf', function(req, res) {
  res.send(bettendorf);
});
router.get('/api/beverages', function(req, res) {
  res.send(beverages);
});
router.get('/api/ankeny', function(req, res) {
  res.send(ankeny);
});


module.exports = router;

