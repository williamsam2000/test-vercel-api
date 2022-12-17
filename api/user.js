const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

// add new user
router.post("/createUser", async (req, res) => {
  let newUser = req.body.newUser;
  newUser.role = "customer";
  newUser.status = "new";

  const user = new User(newUser);
  try {
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).json({ message: err.messages });
  }
});

// get all user (customer and doctor)
router.get("/getAllUser", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ meesage: err.message });
  }
});

// get single user by by firebaseID
router.get("/getUserByFirebaseID", async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUID: req.query.firebaseUID,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// update user role become doctor
router.post("/userBecomeDoctor", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseUID: req.query.firebaseUID,
      },
      {
        role: "doctor",
        doctorType: req.query.doctorType,
      }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
