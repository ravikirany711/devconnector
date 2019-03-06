const express = require("express");
const router = express.Router();

//@router GET api/posts/test
//@desc   TEST posts route
//@access Public

router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

//we need to export it in order to use in server.js
module.exports = router;
