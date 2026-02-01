const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("../server/routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(
    "mongodb+srv://jeevan072004_db_user:JeeVan@twentytwenty.tke5mfs.mongodb.net/twentytwenty?retryWrites=true&w=majority"
  );
  isConnected = true;
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api", authRoutes);

module.exports = app;
