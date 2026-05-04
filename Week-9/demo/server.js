const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const studentRoutes = require("./Routes");
app.use("/students",studentRoutes);

mongoose.connect(process.env.URI).then(() => console.log("Mongo DB connected")).catch((err)=> console.log(err))


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

