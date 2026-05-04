// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const SECRET = "mysecretkey"; // use env variable in real apps

// Dummy user (simulate DB)
const userDB = [];

// 🔹 Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  userDB.push({ username, password: hashedPassword });

  res.json({ message: "User registered" });
});

// 🔹 Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = userDB.find(u => u.username === username);
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  // Create token
  const token = jwt.sign(
    { username: user.username },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// 🔹 Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ msg: "No token" });

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
};

// 🔹 Protected Route
app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));