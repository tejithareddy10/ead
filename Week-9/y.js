const fs = require('fs');

const data = `Name : Revanth Reddy
rollno : 115
branch : IT
year : 2nd`;

const fileName = "student.txt";

fs.writeFile(fileName,data,(err) => {
    if(err) throw err;
    console.log("FileCreated Succesfully");

    fs.readFile(fileName,"utf-8",(err,data) =>{
        if(err) throw err;
        console.log(data);
        fs.appendFile(fileName,"\nPh: 9876543210",(err)=>{
            if(err) throw err;
            console.log("Appended succesfully");

            fs.readFile(fileName,"utf-8",(err,data)=>{
                if(err)throw err;
                console.log(data);
            });
        });
    });
});