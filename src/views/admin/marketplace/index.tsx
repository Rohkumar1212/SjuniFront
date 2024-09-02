import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./students.css";
import AddStudent from "./addStudents";
import { Student } from './types'; // Adjust the path according to your project structure

export default function Marketplace() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null); // Define viewingStudent state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null); // Define editingStudent state
  const [showAddStudent, setShowAddStudent] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/v1/getAllStudents/og7ivppYZ74cWjZ6HhCvnopqyb/dzq3lGV6sJmCVtca5sJcInRgi5fRzs988GNMYfcVzIbqA3inUPy?pageNumber=2&pageSize=2"
      );
      console.log("Response data:", response.data.data);
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        throw new Error("Unexpected response format");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (axios.isAxiosError(error) && error.response) {
        setError(
          `Error fetching data: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error instanceof Error) {
        setError(`Error fetching data: ${error.message}`);
      } else {
        setError("Unknown error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowAddStudent(true);
  };

  const handleAddStudent = (newStudent: Student) => {
    if (editingStudent) {
      setData(prevData =>
        prevData.map(student => (student._id === newStudent._id ? newStudent : student))
      );
      setEditingStudent(null);
    } else {
      setData(prevData => [...prevData, newStudent]);
    }
    fetchData(); // Refresh the data list after adding or updating a student
  };

  if (loading) {
    return <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>Loading...</Box>;
  }

  if (error) {
    return <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>{error}</Box>;
  }

  return (
    <div className="container">
      <div className="col-md-2 offset-10 p-2">
        <div>
          <Button className="btn addbtn p-3 btn-secondary" onClick={() => setShowAddStudent(true)}>Add Students</Button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Category</th>
              <th>Course Name</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Aadhar Number</th>
              <th>PAN Number</th>
              <th>education</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student._id}>
                <td>
                  <img
                    src={`${student.profilePic.picPath}${student.profilePic.picName}`}
                    alt={student.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.category}</td>
                <td>{student.course_name}</td>
                <td>{student.father_name}</td>
                <td>{student.mother_name}</td>
                <td>{student.aadhar_number}</td>
                <td>{student.pan_number}</td>
                <td className="education">
                  {student.education &&
                    student.education.map((education) => (
                      <div className="education" key={education._id}>
                        <p>Class: {education.student_class}</p>
                        <p>Roll Number: {education.roll_number}</p>
                        <p>Board: {education.board_name}</p>
                        <p>Year: {education.passing_year}</p>
                        <img
                          src={`${education.marksheet.filePath}${education.marksheet.fileName}`}
                          alt={education.marksheet.marksheetName}
                          width={50}
                          height={50}
                        />
                      </div>
                    ))}
                </td>
                <td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(student)}
                    mr={2}
                  />
                  {/* <IconButton
                    aria-label="View"
                    icon={<ViewIcon />}
                    onClick={() => handleView(student)}
                    mr={2}
                  /> */}
                  {/* <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(student._id)}
                  /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStudent
        show={showAddStudent}
        student={editingStudent}
        handleClose={() => setShowAddStudent(false)}
        handleAddStudent={handleAddStudent}
      />
    </div>
  );
}
