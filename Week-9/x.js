const http = require('http');

const port = 3000;

const server = http.createServer((req,res) => {
    if(req.url == '/'){
        res.writeHead(200,{'content-type':'text/html'})
        res.end(`
        <html>
            <body>
            <h1>Hello</h1>
            <p>This is Home page</p>
            </body>
        </html>
        `)
    }else if(req.url == '/about'){
        res.writeHead(200,{'content-type':'text/html'})
        res.end(`
        <html>
            <body>
            <h1>Hello</h1>
            <p>This is about page</p>
            </body>
        </html>
        `)
    }else if(req.url == '/contact'){
        res.writeHead(200,{'content-type':'text/html'})
        res.end(`
        <html>
            <body>
            <h1>Hello</h1>
            <p>This is contact page</p>
            </body>
        </html>
        `)
    }
    else{
        res.writeHead(404,{'content-type':'text/html'})
        res.end(`
        <html>
            <body>
            <h1>404</h1>
            <p>Page not found</p>
            </body>
        </html>
        `)
    }
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})