const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

/**
 * GET → Fetch all students
 */

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/**
 * POST → Add new student
 */
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      message: "Student added",
      student
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT → Update student
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Student not found" });

    res.json({
      message: "Student updated",
      student: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE → Remove student
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Student not found" });

    res.json({
      message: "Student deleted",
      student: deleted
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;