import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConsultantData.css"; // Import the CSS file
export interface Student {
  adminId: string;
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
}

const ConsultantData: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
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
    adminId: "",
  });
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null); // Add this state to store the ID of the student being edited

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
       `${process.env.REACT_APP_API_URL}/api/v1/getAllConsultants/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK`
      );
      setStudents(response.data.data);
      setEditingStudentId(response.data.adminId)
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  interface StudentTableProps {
    data: Student[];
  }

  const StudentTable: React.FC<StudentTableProps> = ({ data }) => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Profile Pic</th>
          <th className="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student) => (
          <tr key={student._id}>
            <td>{parseInt(student._id, 10)}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.mobile}</td>
            <td>
              {student.profilePic && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${student.profilePic.picPath}/${student.profilePic.picName}`}
                  width={50}
                  height={50}
                  alt="Profile Pic"
                />
              )}
            </td>
            <td className="actions">
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
                onClick={() => handleDelete(student.adminId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setEditingStudentId(student.adminId)
    setShowPopup(false);
    setNewStudent({
      ...student,
    });
    setProfilePicFile(null); // Reset the file input
    setIsEditing(true);
  };

  const handleViewClick = async (student: Student) => {
    try {
      setViewingStudent(student);
      setShowViewModal(true);
    } catch (error) {
      setError("Error fetching student data");
    }
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
      adminId: "",
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
      const url = `${process.env.REACT_APP_API_URL}/api/v1/deleteConsultant/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK/${adminId}`;
      console.log("Deleting admin with URL:", url);
      const headers = {
        // 'Authorization': 'Bearer yourTokenHere', // Uncomment and set your token if needed
      };

      const response = await axios.delete(url, { headers });
      console.log("Admin deleted successfully", response.data);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error deleting admin:",
          error.message,
          error.response?.data
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newStudent.name);
      formData.append('email', newStudent.email);
      formData.append('mobile', newStudent.mobile);
      formData.append('password', newStudent.password);
      formData.append('role', newStudent.role);
      formData.append('isSuperAdmin', String(newStudent.isSuperAdmin));
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      let response;
      console.log("first", editingStudentId)
      if (editingStudentId) {
        // Update existing consultant
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/updateConsultant/${editingStudentId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // Add new consultant
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/createSuperAdmin`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
      console.log(response.data.message); // Log the message from the response
      fetchData();
      setIsEditing(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Close popup after 3 seconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // For Axios errors, error.response contains the details
        console.error('Error saving student data:', error.response?.data);
      } else {
        // For other errors
        console.error('Error saving student data:', error);
      }
      // Optionally, you can show a user-friendly error message here
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Consultant Data</h2>
      <button className="btn btn-info mb-3" onClick={handleAddClick}>
        Add New Consultant
      </button>
      <StudentTable data={students} />

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
        <div
          className={`modal ${showViewModal ? "show" : ""}`}
          tabIndex={-1}
          role="dialog"
          style={{ display: showViewModal ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Student Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowViewModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {viewingStudent.name}
                </p>
                <p>
                  <strong>Email:</strong> {viewingStudent.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {viewingStudent.mobile}
                </p>
                {/* Include other fields you want to display */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of modal for viewing student details */}

      {/* Modal for editing/add */}
      <div
        className={`modal ${isEditing ? "show" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ display: isEditing ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={handleFormSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingStudent ? "Edit Consultant" : "Add New Consultant"}
                </h5>
                <button
                  type="button"
                  className="close text-lg-end"
                  onClick={() => setIsEditing(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newStudent.mobile}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, mobile: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    value={newStudent.password}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newStudent.role}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, role: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Profile Pic:</label>

                  <input
                    type="file"
                    onChange={(e) =>
                      setProfilePicFile(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <div className="col-md-12 editupdate">
                  <button type="submit">
                    {isEditing ? "Update" : "Create"} Consultant
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
      {/* End of modal */}
    </div>
  );
};

export default ConsultantData;
