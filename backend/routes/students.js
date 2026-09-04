const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

// GET /api/students - list all students 
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ name: 1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// GET /api/students/search?name=John - search by name 
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'A name query parameter is required' });
        }

        const students = await Student.find({
            name: { $regex: name, $options: 'i' }
        }).sort({ name: 1 });

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search students' });
    }
});

// POST /api/students - add a new student
router.post('/', async (req, res) => {
    try {
        const { name, studentId, phone, zip } = req.body;
        if (!name || !studentId || !phone || !zip) {
            return res.status(400).json({ error: 'Name, studentId, phone, and zip are all required' });
        }

        const student = await Student.create({ name, studentId, phone, zip });
        res.status(201).json(student);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'A student with this ID already exists' });
        }
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// DELETE /api/students/:id - delete a student and their enrollments
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await Enrollment.deleteMany({ student: student._id });

        res.json({ message: 'Student deleted successfully', student });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

module.exports = router;