require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./api/user");

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;

// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));
// app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/user", user);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
