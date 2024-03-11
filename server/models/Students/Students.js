const mongoose = require('mongoose');

// Schema for Student
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true,
  },
});

// Schema for Batch
const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  students: [studentSchema], // Array of Student objects
});

// Schema for Course
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  batches: [batchSchema], // Array of Batch objects
});

// Model for Course
const Students = mongoose.model('Student', courseSchema);

module.exports = Students;
