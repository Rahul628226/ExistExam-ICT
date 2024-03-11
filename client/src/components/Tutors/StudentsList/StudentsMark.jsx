import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';

const StudentsMark = () => {
  const [studentData, setStudentData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('Batch 1');

  const [formativeScores, setFormativeScores] = useState({});

  const CourseName = localStorage.getItem("CourseName");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Student/students/${CourseName}/${encodeURIComponent(selectedBatch)}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Response Data:', data); // Log the data to inspect its structure
          if (Array.isArray(data) && data.length > 0 && data[0].students) {
            const initialFormativeScores = {};
            data[0].students.forEach((student) => {
              initialFormativeScores[student.studentId] = {
                assignments: 0,
                competition: 0,
                project: 0,
                Formative: 0,
                Summative: 0,
              };
            });
            setFormativeScores(initialFormativeScores);
            setStudentData(data[0].students);
          } else {
            throw new Error('Invalid response format: Missing students data.');
          }
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedBatch]);
  
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleFormativeScoreChange = (event, type, studentId) => {
    const value = parseInt(event.target.value) || 0;
    setFormativeScores((prevScores) => ({
      ...prevScores,
      [studentId]: {
        ...prevScores[studentId],
        [type]: value
      }
    }));
  };

  const handleSaveData = async () => {
    try {
      const response = await fetch('http://localhost:5000/Student/Score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: 'Course A',
          batchName: selectedBatch,
          // Include other data properties for saving
          formativeScores,
        }),
      });

      if (response.ok) {
        console.log('Student data saved successfully.');
        
      } else {
        alert('Already Submited');
      }
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };
  
  const calculateTotalScore = (studentId) => {
    const formativeScore = formativeScores[studentId] || {};
    const { assignments = 0, competition = 0, project = 0 } = formativeScore;
    const totalFormativeScore = assignments + competition + project;
    return totalFormativeScore;
  };
  
  const calculateGrandTotalScore = (studentId) => {
    const formativeScore = formativeScores[studentId] || {};
    const { Formative = 0, Summative = 0 } = formativeScore;
    const totalGrandScore = Formative + Summative;
    return totalGrandScore;
  };
  
  const calculateEligibility = (studentId) => {
    const totalScore = calculateTotalScore(studentId) + calculateGrandTotalScore(studentId);
    return totalScore >= 50 ? 'Eligible' : 'Not Eligible';
  };
  const buttonStyle = {
    backgroundColor: '#c4f2d6',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <div style={{padding:'20px'}}>
      <FormControl fullWidth>
        <InputLabel id="batch-select-label">Select Batch</InputLabel>
        <Select
          labelId="batch-select-label"
          id="batch-select"
          value={selectedBatch}
          label="Select Batch"
          onChange={handleBatchChange}
        >
          <MenuItem value="Batch 1">Batch 1</MenuItem>
          <MenuItem value="Batch 2">Batch 2</MenuItem>
          {/* Add more batch options if needed */}
        </Select>
        <button style={buttonStyle} onClick={handleSaveData}>
      Save
    </button>
      </FormControl>

      <TableContainer component={Paper}>
        <Table >
          <TableHead >
            <TableRow  style={{ backgroundColor: '#c6d8f5', color: 'white', }}>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Student ID</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Student Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Student Email</TableCell>
              <TableCell colSpan={4} style={{ fontWeight: 'bold', fontSize: '16px' }}>Formative Assessment</TableCell>
              <TableCell colSpan={3} style={{ fontWeight: 'bold', fontSize: '16px' }}>Grand Total</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Eligibility</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>  
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Assignments/caseStudy</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Competition</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Project</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Total</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Formative</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Summative</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Total Score</TableCell>
              
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{student.studentEmail}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={formativeScores[student.studentId]?.assignments || 0}
                    onChange={(e) => handleFormativeScoreChange(e, 'assignments', student.studentId)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={formativeScores[student.studentId]?.competition || 0}
                    onChange={(e) => handleFormativeScoreChange(e, 'competition', student.studentId)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={formativeScores[student.studentId]?.project || 0}
                    onChange={(e) => handleFormativeScoreChange(e, 'project', student.studentId)}
                  />
                </TableCell>
                <TableCell>{calculateTotalScore(student.studentId)}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={formativeScores[student.studentId]?.Formative || 0}
                    onChange={(e) => handleFormativeScoreChange(e, 'Formative', student.studentId)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={formativeScores[student.studentId]?.Summative || 0}
                    onChange={(e) => handleFormativeScoreChange(e, 'Summative', student.studentId)}
                  />
                </TableCell>
                <TableCell>{calculateGrandTotalScore(student.studentId)}</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>{calculateEligibility(student.studentId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
};



export default StudentsMark;