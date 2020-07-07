var express = require('express');
var router = express.Router();
let bettendorf = require("../public/data/bettendorf.json");
let beverages = require("../public/data/beverages.json");
let ankeny = require("../public/data/ankeny.json");

/* GET home page. */
router.get('/bettendorf', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(bettendorf);
});
router.get('/beverages', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(beverages);
});

router.get('/ankeny', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(ankeny);
});

module.exports = router;
