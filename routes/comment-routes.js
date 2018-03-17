var router = require('express').Router();
var db = require("../models");


router.put("/:id", function(req,res){
  db.Comment.findOneAndUpdate({_id: req.params.id }, req.body)
  .then(function(dbComment){
    res.json(dbComment);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.delete("/:id", function(req,res){
  db.Comment.deleteOne({_id: req.params.id })
  .then(function(dbComment){
    res.json(dbComment);
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;