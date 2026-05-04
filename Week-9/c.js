const http = require("http");

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.writeHead(200,{"content-type":"text/html"})
        res.end(``)
    }
})