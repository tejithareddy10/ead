const express = require('express');
const app = express();
const PORT = 3000;



// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Student API!");
});

// In-memory database (for demo)
let students = [
  { id: 1, name: "Ravi", age: 20 },
  { id: 2, name: "Sita", age: 21 }
];

let nextId = 3;

/**
 * GET → Fetch all students
 */


app.get("/students", (req, res) => {
  res.json(students);
});

/**
 * POST → Add new student
 */
app.post("/students", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age required" });
  }

  const newStudent = {
    id: nextId++,
    name,
    age
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added",
    student: newStudent
  });
});

/**
 * PUT → Update student
 */
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name) student.name = name;
  if (age) student.age = age;

  res.json({
    message: "Student updated",
    student
  });
});

/**
 *  DELETE → Remove student
 */
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);

  res.json({
    message: "Student deleted",
    student: deleted[0]
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});