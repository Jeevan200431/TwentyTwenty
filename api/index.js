const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("../server/routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://jeevan072004_db_user:JeeVan@twentytwenty.tke5mfs.mongodb.net/twentytwenty?retryWrites=true&w=majority"
);

// 🔥 CRITICAL FIX HERE
app.use(authRoutes);

module.exports = app;
