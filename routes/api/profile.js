const express = require("express");
const router = express.Router();

//@router GET api/profile/test
//@desc   TEST profile route
//@access Public

router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

//we need to export it in order to use in server.js
module.exports = router;
