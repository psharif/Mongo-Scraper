var router = require('express').Router();
var scraper = require("../public/assets/js/scraper.js");
var db = require("../models");

router.get('/', function(req, res){
	scraper.getArticles((articles)=>{
		res.render("index", {article: articles});
	});
});

///Article Routes 
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
    .populate("comments")
    .then(function(savedArticles) {
      res.render('savedArticles', {savedArticle: savedArticles});
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.delete("/articles/:id", function(req,res){
  db.Article.deleteOne({_id: req.params.id })
  .then(function(dbArticle){
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

///Message Routes
router.post("/articles/:id", function(req, res){
  db.Comment.create(req.body)
    .then(function(dbComment) {
      // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{ "comments": dbComment._id } }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.put("/comments/:id", function(req,res){
  db.Comment.findOneAndUpdate({_id: req.params.id }, req.body)
  .then(function(dbComment){
    res.json(dbComment);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.delete("/comments/:id", function(req,res){
  db.Comment.deleteOne({_id: req.params.id })
  .then(function(dbComment){
    res.json(dbComment);
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;