import React, { useState } from 'react';
import useCourseData from '../Course/Course';

const MarkList = () => {
    const { courseNames, batchNames } = useCourseData();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [appliedSelection, setAppliedSelection] = useState(null);

  const handleCourseClick = (courseName) => {
    setSelectedCourse(courseName);
  };

  const handleBatchClick = (batchName) => {
    setSelectedBatch(batchName);
  };

  const handleApply = () => {
    setAppliedSelection({
      course: selectedCourse,
      batch: selectedBatch,
    });
  };

  return (
    <div>
      <h2>Select Course</h2>
      {courseNames.map((courseName) => (
        <button
          key={courseName}
          onClick={() => handleCourseClick(courseName)}
          style={{
            backgroundColor: selectedCourse === courseName ? 'green' : 'white',
          }}
        >
          {courseName}
        </button>
      ))}

      <h2>Select Batch</h2>
      {batchNames.map((batchName) => (
        <button
          key={batchName}
          onClick={() => handleBatchClick(batchName)}
          style={{
            backgroundColor: selectedBatch === batchName ? 'green' : 'white',
          }}
        >
          {batchName}
        </button>
      ))}

      <button onClick={handleApply}>Apply</button>

      {appliedSelection && (
        <div>
          <h2>Selected Course and Batch</h2>
          <p>Course: {appliedSelection.course}</p>
          <p>Batch: {appliedSelection.batch}</p>
        </div>
      )}
    </div>
  );
};

export default MarkList;
