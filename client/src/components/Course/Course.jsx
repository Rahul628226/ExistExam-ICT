import React, { useEffect, useState } from 'react';

const useCourseData = () => {
  const [courseNames, setCourseNames] = useState([]);
  const [batchNames, setBatchNames] = useState([]);

  const fetchBatchNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/student/batches');
      if (response.ok) {
        const data = await response.json();
        setBatchNames(data);
      } else {
        console.error('Error fetching batch names');
      }
    } catch (error) {
      console.error('Error fetching batch names:', error);
    }
  };

  const fetchCourseNames = async () => {
    try {
      const response = await fetch('http://localhost:5000/student/courses');
      if (response.ok) {
        const data = await response.json();
        setCourseNames(data);
      } else {
        console.error('Error fetching course names');
      }
    } catch (error) {
      console.error('Error fetching course names:', error);
    }
  };

  useEffect(() => {
    fetchCourseNames();
    fetchBatchNames();
  }, []);

  return { courseNames, batchNames };
};

export default useCourseData;
