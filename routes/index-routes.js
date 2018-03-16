var router = require('express').Router();
var scraper = require("../public/assets/js/scraper.js");
var db = require("../models");

router.get('/', function(req, res){
	scraper.getArticles((articles)=>{
		res.render("index", {article: articles});
	});
});

router.post('/articles', function(req,res){
      db.Article.create(req.body)
        .then(function(dbArticle) {
          res.json(res.json);

        })
        .catch(function(err) {
          return res.json(err);
        });
});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(savedArticles) {
      res.render('savedArticles', {savedArticle: savedArticles});
    })
    .catch(function(err) {
      res.json(err);
    });
});



module.exports = router;