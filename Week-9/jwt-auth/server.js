const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'JWT Lab API is running' });
});

// Protected route BEFORE 404
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user
  });
});

// 404 ALWAYS LAST
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Use PORT from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});