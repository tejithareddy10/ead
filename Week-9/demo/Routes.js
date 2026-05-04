const express = require('express');
const router = express.Router();
const Student = require("./schema");

router.get("/",async(req,res)=>{
    const students = await Student.find();
    res.json(students);
})

router.post("/",async(req,res)=>{
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({
            message : "Student added",
            student
            
        })
    }catch(err){
        res.status(400).json({
            message : "Error",
            error : err.message
        })
    }
});

router.put("/:id",async(req,res)=>{
    try{
        const updated = await Student.findByIdAndUpdate(req.params.id,req.body,{new : true})
        res.status(200).json({
            message : "Student updated",
            student : updated
        })
    }catch(err){
        res.status(400).json({
            message : "Error",
            error : err.message
        })
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const deleted = await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : "Student deleted",
            student : deleted
        })
    }catch(err){
        res.status(400).json({
            message : "Error",
            error : err.message
        })
    }
})

module.exports = router;