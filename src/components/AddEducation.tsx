import React, { useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEduction.css";

interface FormData {
  [key: string]: string | File | null;
}
interface FormData {
  name: string;
  roll_number: string;
  registration_number: string;
  father_name: string;
  mother_name: string;
  address: string;
  email: string;
  phone: string;
  date_of_birth: string;
  category: string;
  aadhar_number: string;
  pan_number: string;
  course_name: string;
  student_class: string;
  class_roll_number: string;
  board_name: string;
  passing_year: string;
  marksheet_fileName: string;
  marksheet_filePath: string;
  marksheet_marksheetName: string;
  marksheet: File | null;
}

const AddEducation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    roll_number: "",
    registration_number: "",
    father_name: "",
    mother_name: "",
    address: "",
    email: "",
    phone: "",
    date_of_birth: "",
    category: "",
    aadhar_number: "",
    pan_number: "",
    course_name: "",
    student_class: "",
    class_roll_number: "",
    board_name: "",
    passing_year: "",
    marksheet_fileName: "",
    marksheet_filePath: "",
    marksheet_marksheetName: "",
    marksheet: null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, marksheet: file || null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          // Append marksheet file separately to FormData
          if (key === "marksheet" && formData[key]) {
            formDataToSend.append(key, formData[key] as File);
          } else {
            formDataToSend.append(key, formData[key] as string);
          }
        }
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/addEducation/SScybAfCKMSbpRXPiB8w0RwvSW/85gdSpxZAgqCEE31i1CBn35Dwf/UYrxr0BuxMOGjXqlO7DvDi07WL4KmYVo0ZW1UxEPz1G0a762Qew`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      setShowSuccessMessage(true);
      console.log(data);
      setIsSuccess(true);

      setFormData({
        name: "",
        roll_number: "",
        registration_number: "",
        father_name: "",
        mother_name: "",
        address: "",
        email: "",
        phone: "",
        date_of_birth: "",
        category: "",
        aadhar_number: "",
        pan_number: "",
        course_name: "",
        student_class: "",
        class_roll_number: "",
        board_name: "",
        passing_year: "",
        marksheet_fileName: "",
        marksheet_filePath: "",
        marksheet_marksheetName: "",
        marksheet: null,
      });
      // Optionally, you can set a state to display success message or reset the form.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="AddEducation">
      <h3 className="text-center">Add Education</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Roll Number:</label>
            <input
              type="text"
              name="roll_number"
              value={formData.roll_number}
              onChange={handleChange}
              required
            />
          </div>
          <div  className="col-md-3">
            <label>Registration Number:</label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Father's Name:</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Mother's Name:</label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div  className="col-md-3">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
               className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div  className="col-md-3">
            <label>Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Category:</label>
            <input
              type="text"
              name="category"
               className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Aadhar Number:</label>
            <input
              type="text"
               className="form-control"
              name="aadhar_number"
              value={formData.aadhar_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>PAN Number:</label>
            <input
              type="text"
              name="pan_number"
               className="form-control"
              value={formData.pan_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Course Name:</label>
            <input
              type="text"
              name="course_name"
               className="form-control"
              value={formData.course_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Class:</label>
            <input
              type="text"
              name="student_class"
               className="form-control"
              value={formData.student_class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Class Roll Number:</label>
            <input
              type="text"
              name="class_roll_number"
               className="form-control"
              value={formData.class_roll_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Board Name:</label>
            <input
              type="text"
              name="board_name"
               className="form-control"
              value={formData.board_name}
              onChange={handleChange}
              required
            />
          </div>
          <div  className="col-md-3">
            <label>Passing Year:</label>
            <input
              type="text"
              name="passing_year"
               className="form-control"
              value={formData.passing_year}
              onChange={handleChange}
              required
            />
          </div>
          <div  className="col-md-3">
            <label>Marksheet File Name:</label>
            <input
              type="text"
              name="marksheet_fileName"
               className="form-control"
              value={formData.marksheet_fileName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Marksheet:</label>
            <input
              type="file"
              name="marksheet"
               className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="col-md-3"> <button type="submit">Submit</button></div>
         
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-popup">
           <div className="popup">
            <p>Submission successful!</p>
            <button onClick={() => setIsSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEducation;
