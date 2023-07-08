const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://teamshareoh:S1CrdKhNQC9zzwyf@cluster0.oxcxg7p.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI

//connect to express
const express = require("express");
const app = express();
app.listen(3000, () => console.log(`Listening on port 3000`));

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Test route to check connection.
const testController = require("./src/controllers/test.js");
app.use("/test", testController);
