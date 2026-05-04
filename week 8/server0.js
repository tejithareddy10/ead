const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.write(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to Home Page</h1>
                    <a href="/about">About</a><br>
                    <a href="/contact">Contact</a>
                </body>
            </html>
        `);
    } 
    else if (req.url === '/about') {
        res.write(`
            <html>
                <head><title>About</title></head>
                <body>
                    <h1>About Us</h1>
                    <p>This is the about page.</p>
                    <a href="/">Home</a>
                </body>
            </html>
        `);
    } 
    else if (req.url === '/contact') {
        res.write(`
            <html>
                <head><title>Contact</title></head>
                <body>
                    <h1>Contact Us</h1>
                    <p>Email: example@email.com</p>
                    <a href="/">Home</a>
                </body>
            </html>
        `);
    } 
    else {
        res.write(`
            <html>
                <head><title>404</title></head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <a href="/">Go Home</a>
                </body>
            </html>
        `);
    }

    res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});