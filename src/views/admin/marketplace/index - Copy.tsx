import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./students.css";
import AddStudentData from "./addStudents";

interface Student {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  date_of_birth: string;
  category: string;
  course_name: string;
  profilePic: {
    picName: string;
    picPath: string;
  };
  father_name: string;
  mother_name: string;
  aadhar_number: string;
  pan_number: string;
  education: {
    marksheet: {
      fileName: string;
      filePath: string;
      marksheetName: string;
    };
    student_class: string;
    roll_number: string;
    board_name: string;
    passing_year: string;
    _id: string;
  }[];
}

export default function Marketplace() {
 const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/v1/getAllStudentsOfAConsultant/og7ivppYZ74cWjZ6HhCvnopqyb/dzq3lGV6sJmCVtca5sJcInRgi5fRzs988GNMYfcVzIbqA3inUPy/5DZRlFnbgJuZrbjkXMbF81CK1I?pageNumber=1&pageSize=3"
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

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit student with ID: ${id}`);
    // Add your edit functionality here
  };

  const handleView = (student: Student) => {
    console.log("View student:", student);
    setViewingStudent(student);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete student with ID: ${id}`);
    // Add your delete functionality here
  };

  

  if (loading) {
    return <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>Loading...</Box>;
  }

  if (error) {
    return <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>{error}</Box>;
  }

  return (
    <div className="container">
      <div className="col-md-2 offset-10">
        <div>
        <button className="btn btn-secondary" onClick={() => setShowAddStudent(true)}>Add Students</button>

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
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          {/* <ViewStudentDetails student={viewingStudent} /> */}
        </Box>
      )}
    </div>
  );
}