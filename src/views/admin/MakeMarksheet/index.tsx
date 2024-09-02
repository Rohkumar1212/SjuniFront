import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

interface Student {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  date_of_birth: string;
  category: string;
  course_name: string;
  // Add other properties as needed
}

export default function Settings() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null); // State to track the student being viewed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/v1/getAllStudentsOfAConsultant/og7ivppYZ74cWjZ6HhCvnopqyb/dzq3lGV6sJmCVtca5sJcInRgi5fRzs988GNMYfcVzIbqA3inUPy/5DZRlFnbgJuZrbjkXMbF81CK1I?pageNumber=1&pageSize=3');
        console.log('Response data:', response.data); // Log the response data to inspect its structure

        if (Array.isArray(response.data.data)) {
          setData(response.data.data); // Set the data array from the response
        } else {
          throw new Error('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Check if the error is an AxiosError and has a response
        if (axios.isAxiosError(error) && error.response) {
          setError(`Error fetching data: ${error.response.status} ${error.response.statusText}`);
        } else if (error instanceof Error) {
          setError(`Error fetching data: ${error.message}`);
        } else {
          setError('Unknown error occurred');
        }

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit student with ID: ${id}`);
    // Add your edit functionality here
  };

  const handleView = (student: Student) => {
    console.log('View student:', student);
    setViewingStudent(student); // Set the student being viewed
  };

  const handleDelete = (id: string) => {
    console.log(`Delete student with ID: ${id}`);
    // Add your delete functionality here
  };

  if (loading) {
    return <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>Loading...</Box>;
  }

  if (error) {
    return <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>{error}</Box>;
  }

  return (
    <div className='container'>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Category</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.category}</td>
                <td>{student.course_name}</td>
                <td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(student._id)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="View"
                    icon={<ViewIcon />}
                    onClick={() => handleView(student)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewingStudent && (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          {/* <ViewStudentDetails student={viewingStudent} /> */}
        </Box>
      )}
    </div>
  );
}
