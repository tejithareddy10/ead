const express = require('express');
const app = express();

// 1. Global Application-Level Middleware
// This runs for EVERY incoming request regardless of the path or method.
app.use((req, res, next) => {
    console.log(`[Global Middleware] Time: ${new Date().toLocaleTimeString()} | Method: ${req.method} | URL: ${req.url}`);
    next(); // Passes control to the next middleware or route handler
});

// 2. Path-Specific Application-Level Middleware
// This runs ONLY for requests where the path starts with '/user'.
app.use('/user', (req, res, next) => {
    console.log('[Path-Specific Middleware] Someone is accessing a user route!');
    next(); // Passes control
});

// --- Routes ---

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page! Check your terminal to see the Global Middleware log.');
});

app.get('/user/profile', (req, res) => {
    res.send('User Profile Page! Check your terminal to see BOTH middleware logs.');
});

app.get('/about', (req, res) => {
    res.send('About Page. Only the global middleware runs here.');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
