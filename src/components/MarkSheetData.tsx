import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MarkSheetData.css";
import MarksheetPreview from "./MarksheetPreview"; // Import the preview component

interface Subject {
  code: string;
  subject_details: string;
  year: string;
  session: string;
  max_number: string;
  total_number: string;
}

interface FormData {
  userId: string;
  consultantId: string;
  universityName: string;
  fathername: string;
  mothername: string;
  category: string;
  marksheet_description: string;
  student_name: string;
  registration_number: string;
  roll_number: string;
  sr_number: string;
  st_number: string;
  obtained_the_degree_of: string;
  programme: string;
  passing_description: string;
  passing_criteria: string;
  marksheet_code: string;
  passing_semester: string;
  passing_year: string;
  date_of_issue: string;
  subjects: Subject[];
  student_pic: File | null;
}

const initialFormData: FormData = {
  userId: "",
  consultantId: "",
  universityName: "",
  fathername: "",
  mothername: "",
  category: "",
  marksheet_description: "",
  passing_semester: "",
  passing_year: "",
  student_name: "",
  registration_number: "",
  roll_number: "",
  sr_number: "",
  st_number: "",
  programme: "",
  passing_description: "",
  passing_criteria: "",
  marksheet_code: "",
  obtained_the_degree_of: "",
  date_of_issue: "",
  subjects: [
    {
      code: "",
      subject_details: "",
      year: "",
      session: "",
      max_number: "",
      total_number: "",
    },
  ],
  student_pic: null,
};

const MarksheetApp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError(null);

  //   try {
  //     const isFeePaid = true; // Replace with actual logic
  //     if (!isFeePaid) {
  //       setError(
  //         "Student has not paid the course fee, first pay the fee and upload the payment screenshots"
  //       );
  //       return;
  //     }

  //     // Create a FormData instance
  //     const formDataToSend = new FormData();

  //     // Append form fields
  //     Object.keys(formData).forEach((key) => {
  //       if (key === "subjects") {
  //         // Convert subjects to JSON string and append
  //         const subjectsJson = JSON.stringify(formData.subjects);
  //         formDataToSend.append("subjects", subjectsJson);
  //       } else if (formData[key as keyof FormData] instanceof File) {
  //         formDataToSend.append(key, formData[key as keyof FormData] as File);
  //       } else {
  //         formDataToSend.append(key, formData[key as keyof FormData] as string);
  //       }
  //     });

  //     console.log("Form Data To Send:", formDataToSend);

  //     // Fetch token and URL
  //     const token = localStorage.getItem("token"); // Replace with actual token logic
  //     const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/generateMarksheet/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK/85gdSpxZAgqCEE31i1CBn35Dwf/SScybAfCKMSbpRXPiB8w0RwvSW/`;

  //     // Make API request
  //     const response = await axios.post(apiUrl, formDataToSend, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log("Data posted successfully:", response.data);
  //     setFormData(initialFormData);
  //     setShowSuccessPopup(true); // Show the success popup
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       console.error("Error response data:", error.response.data);
  //       setError(
  //         error.response.data.message ||
  //           "An error occurred while submitting the form."
  //       );
  //     } else {
  //       console.error("Error submitting form data:", error);
  //       setError("An error occurred while submitting the form.");
  //     }
  //   }
  // };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const isFeePaid = true; // Replace with actual logic
      if (!isFeePaid) {
        setError(
          "Student has not paid the course fee, first pay the fee and upload the payment screenshots"
        );
        return;
      }

      // Create a FormData instance
      const formDataToSend = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        if (key === "subjects") {
          // Convert subjects to JSON string and append
          const subjectsJson = JSON.stringify(formData.subjects);
          formDataToSend.append("subjects", subjectsJson);
        } else if (formData[key as keyof FormData] instanceof File) {
          formDataToSend.append(key, formData[key as keyof FormData] as File);
        } else {
          formDataToSend.append(key, formData[key as keyof FormData] as string);
        }
      });

      console.log("Form Data To Send:", formDataToSend);

      // Fetch token and URL
      const token = localStorage.getItem("token"); // Replace with actual token logic
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/generateMarksheet/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK`;

      // Make API request
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data posted successfully:", response.data);
      setFormData(initialFormData);
      setShowSuccessPopup(true); // Show the success popup
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        setError(
          error.response.data.message ||
            "An error occurred while submitting the form."
        );
      } else {
        console.error("Error submitting form data:", error);
        setError("An error occurred while submitting the form.");
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubjectChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [name]: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      subjects: updatedSubjects,
    }));
  };

  const addSubject = () => {
    setFormData((prevState) => ({
      ...prevState,
      subjects: [
        ...prevState.subjects,
        {
          code: "",
          subject_details: "",
          year: "",
          session: "",
          max_number: "",
          total_number: "",
        },
      ],
    }));
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      subjects: updatedSubjects,
    }));
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

 const handleDownload = async () => {
  try {
    const token = localStorage.getItem("token"); // Replace with actual token logic
    const fileUrl = `${process.env.REACT_APP_API_URL}/api/v1/downloadMarksheet/${formData.registration_number}`; // Example endpoint

    // Make API request to fetch the file
    const response = await axios.get(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    console.log('File size:', response.data.size); // Log file size

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'marksheet.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // Clean up the URL object
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};


  return (
    <div className="container">
      <h2>Mark Sheet Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label>
            Student ID:
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Consultant ID:
              <input
                type="text"
                name="consultantId"
                value={formData.consultantId}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              University Name:
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Student Name:
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Student Picture:
              <input
                type="file"
                name="student_pic"
                onChange={handleFileChange}
                className="form-control"
                required
              />
            </label>
          </div>

          <div className="col-md-3">
            <label>
              Father Name:
              <input
                type="text"
                name="fathername"
                value={formData.fathername}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Mother Name:
              <input
                type="text"
                name="mothername"
                value={formData.mothername}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Marksheet Description:
              <input
                type="text"
                name="marksheet_description"
                value={formData.marksheet_description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Obtained the degree of:
              <input
                type="text"
                name="obtained_the_degree_of"
                value={formData.obtained_the_degree_of}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Program:
              <input
                type="text"
                name="programme"
                value={formData.programme}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Registration Number:
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Roll Number:
              <input
                type="text"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              SR Number:
              <input
                type="text"
                name="sr_number"
                value={formData.sr_number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              ST Number:
              <input
                type="text"
                name="st_number"
                value={formData.st_number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Passing Description:
              <input
                type="text"
                name="passing_description"
                value={formData.passing_description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Passing Criteria:
              <input
                type="text"
                name="passing_criteria"
                value={formData.passing_criteria}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Passing Semester:
              <input
                type="text"
                name="passing_semester"
                value={formData.passing_semester}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Passing Year:
              <input
                type="text"
                name="passing_year"
                value={formData.passing_year}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Marksheet Code:
              <input
                type="text"
                name="marksheet_code"
                value={formData.marksheet_code}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Date of Issue:
              <input
                type="date"
                name="date_of_issue"
                value={formData.date_of_issue}
                onChange={handleChange}
                className="form-control"
                required
              />
            </label>
          </div>
         
          <div className="col-md-12">
            <h3 className="text-center">Add Subjects</h3>
            {formData.subjects.map((subject, index) => (
              <div key={index} className="subject-form">
                <h6>Subject {index + 1}</h6>
                <div className="row">
                  <div className="col-md-2">
                    <label>
                      Code:
                      <input
                        type="text"
                        name="code"
                        value={subject.code}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label>
                      Details:
                      <input
                        type="text"
                        name="subject_details"
                        value={subject.subject_details}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label>
                      Practical/Viva:
                      <input
                        type="text"
                        name="year"
                        value={subject.year}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label>
                      Session:
                      <input
                        type="text"
                        name="session"
                        value={subject.session}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label>
                      Max Mark :
                      <input
                        type="text"
                        name="max_number"
                        value={subject.max_number}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label>
                      Total Mark:
                      <input
                        type="text"
                        name="total_number"
                        value={subject.total_number}
                        onChange={(e) => handleSubjectChange(index, e)}
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                </div>
                {formData.subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="btn btn-danger"
                  >
                    Remove Subject
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="btn btn-secondary"
            >
              Add Subject
            </button>
            <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="btn btn-secondary"
        >
          Preview
        </button>
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}       
      </form>
      {showPreview && (
        <MarksheetPreview
          formData={formData}
          onClose={handleClosePreview}
        />
      )}

      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Generate Marksheet successfully!</h3>
            <button onClick={handleCloseSuccessPopup} className="closentn btn btn-primary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarksheetApp;

