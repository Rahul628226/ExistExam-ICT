const express = require('express');
const router = express.Router();
const Student = require('../../models/Students/Score'); // Import the Student model

// POST endpoint for inserting student scores into the database
router.post('/Score', async (req, res) => {
  try {
    const { courseName, batchName, formativeScores } = req.body;

    // Calculate total score and eligibility for each student
    const studentsData = Object.keys(formativeScores).map(studentId => {
      const scores = formativeScores[studentId];
      const totalScore = scores.assignments + scores.competition + scores.Formative + scores.project + scores.Summative;
      const totalScorePercentage = (totalScore / (5 * Object.keys(scores).length)) * 100; // Assuming 5 types of formative scores per student
      const eligibility = totalScorePercentage >= 70 ? 'Eligible' : 'Not Eligible';
      return {
        studentId,
        totalScore,
        eligibility
      };
    });

    // Create an array of student objects with calculated totalScores and eligibility
    const students = studentsData.map(studentData => {
      return {
        courseName,
        batchName,
        studentId: studentData.studentId,
        formativeScores: formativeScores[studentData.studentId],
        totalScores: studentData.totalScore,
        eligibility: studentData.eligibility
      };
    });

    // Save the student data to the database
    await Student.insertMany(students);

    res.status(201).json({ message: 'Student data inserted successfully.', students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;