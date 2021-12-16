var express = require("express");
var router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

require("dotenv").config();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/sign-up", function (req, res, next) {
  console.log("BODY", req.body);

  const { username, password, email } = req.body;

  if (!username || !password) {
    res.json({ error: "Username and password are required" });
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userToCreate = new User({
    username: username,
    password: hashedPassword,
    email: email,
  });

  User.create(userToCreate)
    .then((newlyCreatedUser) => {
      console.log(newlyCreatedUser.id);

      const payload = {
        user: {
          id: newlyCreatedUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token, id: newlyCreatedUser.id, success: true });
          }
        }
      );
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.delete("/delete", auth, (req, res) => {
  console.log("DELETED USER !!!!!", req.user);
  User.findByIdAndRemove(req.user.id)
    .exec()
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404);
      } else {
        res.status(204).json({ deleted: true });
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res.json({ error: "Username and password are required" });
    return;
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      if (!foundUser) {
        res.json({ message: "Username not found" });
        return;
      }

      const passMatch = bcrypt.compareSync(password, foundUser.password);
      if (!passMatch) {
        res.json({ message: "improper password" });
        return;
      }

      const payload = {
        user: {
          id: foundUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({
              token,
              id: foundUser.id,
              success: true,
              username: foundUser.username,
            });
          }
        }
      );
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/login-test", auth, (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/all-users", (req, res) => {
  User.find(req.body)
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/profile/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/my-profile", auth, (req, res) => {
  console.log("REQQQQ!!!!!", req.user.id);
  User.findById(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/profile", auth, (req, res) => {
  User.findByIdAndUpdate(req.user.id, {
    $push: { favTeams: req.body.favTeams, favPlayers: req.body.favPlayers },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
