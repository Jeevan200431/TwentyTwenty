const express = require("express");
const cors = require("cors");
const path = require("path");

const register = require("./api/register");
const login = require("./api/login");

const app = express();

app.use(cors());
app.use(express.json());

// API routes (same as Vercel)
app.post("/api/register", register);
app.post("/api/login", login);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Local server running on http://localhost:${PORT}`)
);
