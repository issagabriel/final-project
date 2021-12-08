const router = require("express").Router();
const { route } = require(".");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

router.post("/add-comment", auth, function (req, res, next) {
  console.log("The new comment:", req.user);

  const commentToCreate = new Comment({
    content: req.body.content,
    commentor: req.user.id,
  });

  Comment.create(commentToCreate)
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/comment", (req, res) => {
  Comment.find()
    .populate("commentor")
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/comment/:id", (req, res) => {
  Comment.find({ commentor: req.params.id })
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.delete("/delete-comment/:id", (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .exec()
    .then((deletedComment) => {
      if (!deletedComment) {
        res.status(404);
      } else {
        res.status(204);
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

module.exports = router;
