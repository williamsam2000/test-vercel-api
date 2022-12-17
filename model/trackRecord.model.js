const mongoose = require("mongoose");

const TrackRecord = new mongoose.Schema({
  handlerFirebaseUID: {
    type: String,
    trim: true,
  },
  patientFirebaseUID: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = mongoose.model("TrackRecord", TrackRecord);
