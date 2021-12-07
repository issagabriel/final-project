const router = require("express").Router();
const Comment = require('../models/Comment')
const User = require("../models/User");

router.post('/add-comment', function (req, res, next) {
    console.log('The new comment:', req.body);
  
    const commentToCreate = new Comment({
      content: req.body.content,
      time: req.body.time,
      commentor: req.body.commentor,
    });
      
  
    Comment.create(commentToCreate)
      .then((results) => {
        console.log('These are the results', results);
        res.json(results);
      })
      .catch((err) => {
        console.log('Something went wrong', err);
        res.json(err);
      });
  });

module.exports = router;