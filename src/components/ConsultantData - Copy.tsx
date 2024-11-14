import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConsultantData.css"; // Import the CSS file

export interface Student {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  profilePic: {
    picName: string;
    picPath: string;
  };
  role: string;
  isSuperAdmin: boolean;
  adminId: string; // Add adminId to the Student interface
}

const ConsultantData: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    _id: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    profilePic: { picName: "", picPath: "" },
    role: "ADMIN",
    isSuperAdmin: false,
    adminId: "", // Initialize adminId
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/v1/getAllConsultants/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c"
      );
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student); // Sets the editingStudent state to the selected student
    setNewStudent({
      ...student,
    });
    setProfilePicFile(null); // Reset the file input
    setIsEditing(true); // Sets the isEditing state to true
  };

  const handleViewClick = (student: Student) => {
    setViewingStudent(student);
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setNewStudent({
      _id: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
      profilePic: { picName: "", picPath: "" },
      role: "ADMIN",
      isSuperAdmin: false,
      adminId: "", // Initialize adminId
    });
    setProfilePicFile(null); // Reset the file input
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleDelete = async (adminId: string) => {
    try {
      const url = `http://localhost:5500/api/v1/deleteConsultant/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/${adminId}`;
      console.log("Deleting admin with URL:", url);

      const headers = {
        // 'Authorization': 'Bearer yourTokenHere', // Uncomment and set your token if needed
      };

      const response = await axios.delete(url, { headers });
      console.log("Admin deleted successfully", response.data);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting admin:", error.message, error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newStudent.name);
      formData.append("email", newStudent.email);
      formData.append("mobile", newStudent.mobile);
      formData.append("password", newStudent.password);
      formData.append("role", newStudent.role);
      formData.append("isSuperAdmin", String(newStudent.isSuperAdmin));
      if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
      }

      let response;
      if (editingStudent) {
        // Update existing consultant
        response = await axios.put(
          `http://localhost:5500/api/v1/updateConsultant/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/${editingStudent.adminId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Add new consultant
        response = await axios.post(
          "http://localhost:5500/api/v1/createSuperAdmin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      console.log(response.data.message); // Log the message from the response
      fetchData();
      setIsEditing(false);
      setShowPopup(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving student data:", error.response?.data);
      } else {
        console.error("Error saving student data:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Consultant Data</h2>
      <button className="btn btn-info mb-3" onClick={handleAddClick}>
        Add New Consultant
      </button>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Profile Pic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td className="mobile">{student.mobile}</td>
              <td className="profilepic">
                {student.profilePic && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${student.profilePic.picPath}/${student.profilePic.picName}`}
                    width={50}
                    height={50}
                    alt="Profile Pic"
                  />
                )}
              </td>
              <td className="actionbtn">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-info btn-sm mx-2"
                  onClick={() => handleViewClick(student)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(student.adminId)} // Use adminId for delete
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {showPopup && (
        <div className="modal fade show" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowPopup(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Form submitted successfully!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Popup */}

      {/* Modal for viewing student details */}
      {viewingStudent && (
        <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Consultant Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setViewingStudent(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{viewingStudent.name}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{viewingStudent.email}</td>
                    </tr>
                    <tr>
                      <th>Mobile</th>
                      <td>{viewingStudent.mobile}</td>
                    </tr>
                    <tr>
                      <th>Profile Pic</th>
                      <td>
                        {viewingStudent.profilePic && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${viewingStudent.profilePic.picPath}/${viewingStudent.profilePic.picName}`}
                            width={50}
                            height={50}
                            alt="Profile Pic"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <td>{viewingStudent.role}</td>
                    </tr>
                    <tr>
                      <th>Is Super Admin</th>
                      <td>{viewingStudent.isSuperAdmin ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th>Admin ID</th>
                      <td>{viewingStudent.adminId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewingStudent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Modal for viewing student details */}
    </div>
  );
};

export default ConsultantData;
