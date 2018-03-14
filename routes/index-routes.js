var router = require('express').Router();
var scraper = require("../public/assets/js/scraper.js");

router.get('/', function(req, res){
  res.send(scraper.getArticles());
  //res.render("index");
});

module.exports = router;