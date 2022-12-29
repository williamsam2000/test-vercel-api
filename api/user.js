const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const TrackRecord = require("../model/trackRecord.model");

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

// update user
router.post("/updateUser", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseUID: req.query.firebaseUID,
      },
      {
        firstName: req.body.updateUser.firstName,
        lastName: req.body.updateUser.lastName,
      }
    );
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

// get doctor by type
router.get("/getDoctorByType", async (req, res) => {
  try {
    const doctor = await User.find({
      role: "doctor",
      doctorType: req.query.doctorType,
    });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// get all customer
router.get("/getAllCustomer", async (req, res) => {
  try {
    const customer = await User.find({
      role: "customer",
    });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// get all doctor
router.get("/getAllDoctor", async (req, res) => {
  try {
    const doctor = await User.find({
      role: "doctor",
    });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// add track record
router.post("/addTrackRecord", async (req, res) => {
  try {
    const data = await TrackRecord({
      handlerFirebaseUID: req.body.handlerFirebaseUID,
      patientFirebaseUID: req.body.patientFirebaseUID,
      notes: req.body.notes,
      time: new Date(),
    });
    const trackRecord = await data.save();
    res.status(200).send(trackRecord);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// show track record
router.get("/showTrackRecord", async (req, res) => {
  try {
    const trackRecord = await TrackRecord.find({
      handlerFirebaseUID: req.query.handlerFirebaseUID,
      patientFirebaseUID: req.query.patientFirebaseUID,
    });
    res.status(200).json(trackRecord);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// update customer consult
router.post("/updateCustomerConsult", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseUID: req.query.firebaseUID,
      },
      {
        $push: {
          consultWith: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            firebaseUID: req.body.firebaseUID,
          },
        },
      }
      // {
      //   consultWith:{
      //     firstName: req.body.firstName,
      //     lastName: req.body.lastName,
      //     firebaseUID: req.body.firebaseUID,
      //   },
      // }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// update doctor consult
router.post("/updateDoctorConsult", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseUID: req.query.firebaseUID,
      },
      {
        $push: {
          consultWith: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            firebaseUID: req.body.firebaseUID,
          },
        },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// upload image
router.post("/uploadImage", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseUID: req.query.firebaseUID,
      },
      {
        imageUrl: req.body.imageUrl,
      }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
