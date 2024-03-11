const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  batchName: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String },
  studentEmail: { type: String },
  formativeScores: {
    assignments: { type: Number, default: 0 },
    competition: { type: Number, default: 0 },
    Formative: { type: Number, default: 0 },
    project: { type: Number, default: 0 },
    Summative: { type: Number, default: 0 },
  },
  totalScores: { type: Number, default: 0 },
  eligibility: { type: String },
});

// Create a compound unique index on courseName, batchName, and studentId
studentSchema.index({ courseName: 1, batchName: 1, studentId: 1 }, { unique: true });

const Student = mongoose.model('Score', studentSchema);

module.exports = Student;
