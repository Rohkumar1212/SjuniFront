import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/StudentsData.css";
import DeleteModal from "./DeleteModal";
interface Student {
  userId: string;
  consultantId: string;
  _id: string;
  name: string;
  roll_number: string;
  registration_number: string;
  father_name: string;
  mother_name: string;
  address: string;
  email: string;
  phone: string;
  date_of_birth: string;
  profilePic: {
    picName: string;
    picPath: string;
  };
  category: string;
  aadhar_number: string;
  pan_number: string;
  course_name: string;
  education: any[];
}

const StudentsData: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState<{studentId: string; userId:string; consultantId:string}>(
    {
      studentId:"",
      userId:"",
      consultantId: ""
    }
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    userId: "",
    consultantId: "",
    _id: "",
    name: "",
    roll_number: "",
    registration_number: "",
    father_name: "",
    mother_name: "",
    address: "",
    email: "",
    phone: "",
    date_of_birth: "",
    profilePic: {
      picName: "",
      picPath: "",
    },
    category: "",
    aadhar_number: "",
    pan_number: "",
    course_name: "",
    education: [],
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [filters, setFilters] = useState({
    email: "",
    name: "",
    id: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, filters]);

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const picName = file.name;
      const picPath = URL.createObjectURL(file);
      setNewStudent((prevState) => ({
        ...prevState,
        profilePic: {
          picName,
          picPath,
        },
      }));
      setProfilePicFile(file);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/getAllStudents/85gdSpxZAgqCEE31i1CBn35Dwf/${process.env.REACT_APP_API_KEY}?pageNumber=2&pageSize=2`
      );
      setStudents(response.data.data);
      setFilteredStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleEdit = (student: Student) => {
    setNewStudent(student);
    setEditingStudentId(student._id);
    handleShow();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditingStudentId(null);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newStudent.name);
      formData.append("roll_number", newStudent.roll_number);
      formData.append("registration_number", newStudent.registration_number);
      formData.append("father_name", newStudent.father_name);
      formData.append("mother_name", newStudent.mother_name);
      formData.append("address", newStudent.address);
      formData.append("email", newStudent.email);
      formData.append("phone", newStudent.phone);
      formData.append("date_of_birth", newStudent.date_of_birth);
      formData.append("category", newStudent.category);
      formData.append("aadhar_number", newStudent.aadhar_number);
      formData.append("pan_number", newStudent.pan_number);
      formData.append("course_name", newStudent.course_name);
      if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
      }

      if (editingStudentId) {
        console.log("Updating student with ID:", editingStudentId);
        // Here, assuming newStudent has the updated data from the payload
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/updateStudent/85gdSpxZAgqCEE31i1CBn35Dwf/UYrxr0BuxMOGjXqlO7DvDi07WL4KmYVo0ZW1UxEPz1G0a762Qew/${editingStudentId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === editingStudentId
              ? {
                  ...student,
                  name: newStudent.name,
                  roll_number: newStudent.roll_number,
                  registration_number: newStudent.registration_number,
                  father_name: newStudent.father_name,
                  mother_name: newStudent.mother_name,
                  address: newStudent.address,
                  email: newStudent.email,
                  phone: newStudent.phone,
                  date_of_birth: newStudent.date_of_birth,
                  category: newStudent.category,
                  aadhar_number: newStudent.aadhar_number,
                  pan_number: newStudent.pan_number,
                  course_name: newStudent.course_name,
                  profilePic: {
                    picName: newStudent.profilePic.picName,
                    picPath: student.profilePic.picPath, // Retain the original path
                  },
                }
              : student
          )
        );
      } else {
        console.log("Adding new student");
        const response = await axios.post(
         `${process.env.REACT_APP_API_URL}/api/v1/addStudent/85gdSpxZAgqCEE31i1CBn35Dwf/UYrxr0BuxMOGjXqlO7DvDi07WL4KmYVo0ZW1UxEPz1G0a762Qew`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setStudents((prevStudents) => [...prevStudents, response.data.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error adding/updating student:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const resetForm = () => {
    setNewStudent({
      userId: "",
      consultantId: "",
      _id: "",
      name: "",
      roll_number: "",
      registration_number: "",
      father_name: "",
      mother_name: "",
      address: "",
      email: "",
      phone: "",
      date_of_birth: "",
      profilePic: {
        picName: "",
        picPath: "",
      },
      category: "",
      aadhar_number: "",
      pan_number: "",
      course_name: "",
      education: [],
    });
    setProfilePicFile(null);
  };

  const applyFilters = () => {
    let filtered = students;
    if (filters.email) {
      filtered = filtered.filter((student) =>
        student.email.includes(filters.email)
      );
    }
    if (filters.name) {
      filtered = filtered.filter((student) => student.name.includes(filters.name));
    }
    if (filters.id) {
      filtered = filtered.filter((student) => student._id.includes(filters.id));
    }
    if (filters.dateOfBirth) {
      filtered = filtered.filter((student) =>
        student.date_of_birth.includes(filters.dateOfBirth)
      );
    }
    setFilteredStudents(filtered);
  };

 const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/deleteStudent/${deletingStudentId.consultantId}/UYrxr0BuxMOGjXqlO7DvDi07WL4KmYVo0ZW1UxEPz1G0a762Qew/${deletingStudentId.studentId}`
      );
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== deletingStudentId.studentId)
      );
      setShowDeleteModal(false);
      setDeletingStudentId({ studentId: "", consultantId: "", userId: "" });
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };


  const openDeleteModal = (studentId: string, consultantId: string, userId: string,) => {
   setDeletingStudentId({studentId, consultantId, userId});
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingStudentId({studentId:"", consultantId:"", userId:""});
  };
  return (
    <div className="container">
      <h5 className="offset-10 text-right">
        <b>Students Data</b>
      </h5>
      <div className="filters">
        <div className="col-md-2">
          <Button
            className="btn addstudents"
            variant="primary"
            onClick={handleShow}
          >
            Add Student
          </Button>
        </div>
        <div className="col-md-2">
          <Form.Control
            type="text"
            name="name"
            placeholder="Search by name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="text"
            name="email"
            placeholder="Search by Email"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="text"
            name="id"
            placeholder="Search by ID"
            value={filters.id}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="date"
            name="dateOfBirth"
            placeholder="Search by Date of Birth"
            value={filters.dateOfBirth}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Registration Number</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Category</th>
              <th>Aadhar Number</th>
              <th>PAN Number</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>
                  {student.profilePic &&
                    student.profilePic.picPath &&
                    student.profilePic.picName && (
                      <img
                        src={`${student.profilePic.picPath}${student.profilePic.picName}`}
                        alt={student.profilePic.picName}
                        width="50"
                        height="50"
                      />
                    )}
                  {!student.profilePic && (
                    <span>No profile picture available</span>
                  )}
                </td>
                <td>{student.name}</td>
                <td>{student.roll_number}</td>
                <td>{student.registration_number}</td>
                <td>{student.father_name}</td>
                <td>{student.mother_name}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.date_of_birth}</td>
                <td>{student.category}</td>
                <td>{student.aadhar_number}</td>
                <td>{student.pan_number}</td>
                <td>{student.course_name}</td>
                <td className="action">
                  <Button variant="warning" onClick={() => handleEdit(student)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => openDeleteModal(student.userId, student.consultantId, student.userId)}
                  >
                    Delete
                  </Button>
                </td>            
                  
              </tr>
            ))}
          </tbody>
        </Table>
        {deletingStudentId.studentId && (
          <DeleteModal
            show={showDeleteModal}
            handleClose={closeDeleteModal}
            handleDeleteConfirm={() =>
              handleDelete()
              }
          />
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudentId ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilePic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={handleProfilePicChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="roll_number">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="roll_number"
                value={newStudent.roll_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="registration_number">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="registration_number"
                value={newStudent.registration_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="father_name">
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                type="text"
                name="father_name"
                value={newStudent.father_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="mother_name">
              <Form.Label>Mother Name</Form.Label>
              <Form.Control
                type="text"
                name="mother_name"
                value={newStudent.mother_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newStudent.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newStudent.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="date_of_birth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={newStudent.date_of_birth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newStudent.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="aadhar_number">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                name="aadhar_number"
                value={newStudent.aadhar_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="pan_number">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type="text"
                name="pan_number"
                value={newStudent.pan_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="course_name">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="course_name"
                value={newStudent.course_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingStudentId ? "Update Student" : "Add Student"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentsData;
