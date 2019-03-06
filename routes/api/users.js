const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();

const User = require("../../models/User");

//@router GET api/users/test
//@desc   TEST users route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users works" });
});

//@router GET api/users/register
//@desc   register user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@router GET api/users/login
//@desc   Login User/return JWT token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email using our USER model
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt PAYLOAD

        //Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          });
      }
    });
  });
});

//we need to export it in order to use in server.js
module.exports = router;
