const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ Custom Middleware (logs request details)
app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date().toLocaleTimeString()}`);
    next();
});

// ✅ Serve static files (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route: /home
app.get('/home', (req, res) => {
    res.send("<h1>Welcome to Home Page</h1>");
});

// ✅ Route: /login
app.get('/login', (req, res) => {
    res.send("<h1>Login Page</h1>");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});