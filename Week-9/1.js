const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const SECRET = "mysecretkey";

const users = [];

app.post("/register", async(req,res) => {
    const {username,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    users.push({ username, password: hashedPassword });
    res.json("User Created Successfully");
});

app.post("/login",async(req,res)=>{
    const {username,password} =req.body;
    const user = users.find((u) => u.username === username);
    if(!user) return res.status(400).json("User nOt found");
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json("Invalid credentials")

    const token = jwt.sign(
        {username},SECRET,{expiresIn:"1hr"}
    )
    res.json({token})
});

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).json("No token found");

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,SECRET);
        req.user= decoded ;
        next();
    }catch(err){
        return res.status(403).json("Invalid Token")
    }
}

app.get("/dashboard",authMiddleware,(req,res)=>{
    res.json({
        message : "Welcome",
        user : req.user
    })
});

app.listen(3000,()=>{
    console.log("Server Running on port 3000")
});
