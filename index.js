const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const app = express();

const cors = require('cors');

// :: Initialice Firestore Database ::
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/subCollection", require("./routes/subCollection"));

exports.app = functions.https.onRequest(app);


