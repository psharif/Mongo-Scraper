var router = require('express').Router();
var scraper = require("../public/assets/js/scraper.js");
var db = require("../models");

router.get('/', function(req, res){
	scraper.getArticles((articles)=>{
		res.render("index", {article: articles});
	});
});

module.exports = router;