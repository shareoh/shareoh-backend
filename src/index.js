const mongoose = require("mongoose");
require('dotenv').config();
const databaseURL = process.env.DATABASE_URL;

//connect to express
const express = require("express");
const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.listen(3000, () => console.log(`Listening on port 3000`));

// Connect to MongoDB
mongoose
  .connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Test route to check connection.
const testController = require("./controllers/test.js");
const userController = require("./controllers/user.js");
app.use("/test", testController);
app.use('/users', userController);
