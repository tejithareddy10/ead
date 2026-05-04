const express = require('express');
const app = express();
const Port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to RestAPI");
});

let students = [
  { id: 1, name: "Ravi", age: 20 },
  { id: 2, name: "Sita", age: 21 }
];

let nextID = 3;

app.get("/students",(req,res)=>{
    res.json(students);
});

app.post("/students",(req,res)=>{
    const {name,age} = req.body;

    if(!name || !age){
        return res.status(400).json({message:"Name and age are required"});
    }
    const newStudent = {
        id : nextID++,
        name : name,
        age : age
    };

    
    students.push(newStudent);

    return res.status(201).json({
        message : "Student Added",
        student : newStudent
    })
});

app.put("/students/:id" , (req,res)=>{
    const id = parseInt(req.params.id);
    const {name,age} = req.body;

    const student = students.find((s) => s.id === id);
    if (!student){
        return res.status(400).json({message :"Student Not Found"});
    }
    if (name) student.name =name ;
    if (age) student.age = age;
    return res.status(200).json({
        message : "Student updated",
        student : student
    });

});

app.delete("/students/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const index = students.findIndex((s) => s.id === id);
    if(index === -1){
        return res.status(400).json({message :"Studnet Not Found"})
    }

    const deleted = students.splice(index,1);
    return res.status(200).json({
        message : "Student Deleted",
        student : deleted[0]
    });
});

app.listen(Port,()=>{
    console.log(`Server running on ${Port}`);
})


