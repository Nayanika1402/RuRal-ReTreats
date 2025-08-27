require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json()); // only one JSON parser
app.use(express.static("public"));

connectDB();

const PORT = process.env.PORT || 3000;

const users = []; // Temporary in-memory database
const SECRET_KEY = "its_secret";

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
