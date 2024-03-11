const express = require('express');
const router = express.Router();
const Student = require('../../models/Students/Students');

router.get('/courses', async (req, res) => {
  try {
    const courseNames = await Student.distinct('courses.courseName');
    res.json(courseNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/batches', async (req, res) => {
  try {
    const { courseName } = req.query;
    const batchNames = await Student.distinct('courses.batches.batchName', {
      'courses.courseName': courseName,
    });
    res.json(batchNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/students/:courseName/:batchName', async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const batchName = req.params.batchName;

    // Retrieve students for the specific course and batch using aggregation
    const courseData = await Student.aggregate([
      {
        $unwind: '$courses' // Deconstruct the courses array
      },
      {
        $match: {
          'courses.courseName': courseName // Match the desired course name
        }
      },
      {
        $unwind: '$courses.batches' // Deconstruct the batches array within the matched course
      },
      {
        $match: {
          'courses.batches.batchName': batchName // Match the desired batch name within the course
        }
      },
      {
        $project: {
          _id: 0,
          courseName: '$courses.courseName',
          batchName: '$courses.batches.batchName',
          students: '$courses.batches.students'
        }
      }
    ]);

    // Respond with the retrieved batch data and its students
    res.status(200).json(courseData);
  } catch (err) {
    // Handle errors and send an error response
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
