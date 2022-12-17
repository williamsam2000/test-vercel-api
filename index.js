const express = require("express");
const app = express();
const user = require("./api/user");

const PORT = process.env.PORT || 5000;

app.use("/api/user", user);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
