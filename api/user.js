const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/getAllUser", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.get("/getUser", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ meesage: err.message });
  }
});

module.exports = router;
