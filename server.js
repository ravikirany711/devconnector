const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport=require('passport')

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config(Loading the keys file)
const db = require("./config/keys").mongoURI;

//Connect to MongoDB using mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize())
//Passport config
require('./config/passport')(passport)

//Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`The server is up and running at ${port}`);
});
