import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import './Certificate.css'; // Import the CSS file for styling
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation

interface FormData {
  name: string;
  course: string;
  userId: string;
  consultantId: string;
  university_name: string;
  description: string;
  diploma_certificate_heading: string;
  this_is_to_certify: string;
  obtained_the_degree_of: string;
  deploma_description: string;
  date_of_issue: string;
}

const Certificate: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    course: '',
    userId: '',
    consultantId: '',
    university_name: '',
    description: '',
    diploma_certificate_heading: '',
    this_is_to_certify: '',
    obtained_the_degree_of: '',
    deploma_description: '',
    date_of_issue: '',
  });
  const [showCertificates, setShowCertificates] = useState(false);
  const [certificateData, setCertificateData] = useState<any | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/generateCertificate/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK/${formData.consultantId}/${formData.userId}`;
      
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setCertificateData(response.data.data);
      setShowCertificates(true);
      alert('Certificate details submitted successfully!');

      // Clear form fields after submission
      setFormData({
        name: '',
        course: '',
        userId: '',
        consultantId: '',
        university_name: '',
        description: '',
        diploma_certificate_heading: '',
        this_is_to_certify: '',
        obtained_the_degree_of: '',
        deploma_description: '',
        date_of_issue: '',
      });

    } catch (error) {
      console.error('Error submitting certificate details', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server Response:', error.response.data);
      }
      alert('Failed to submit certificate details');
    }
  };

  const downloadPDF = () => {
    if (certificateData) {
      const doc = new jsPDF();
      const content = `
        <h2>${certificateData.diploma_certificate_heading || ''}</h2>
        <p><strong>Name:</strong> ${certificateData.student_name || ''}</p>
        <p><strong>Course:</strong> ${certificateData.course_name || ''}</p>
        <p><strong>University:</strong> ${certificateData.university_name || ''}</p>
        <p><strong>Description:</strong> ${certificateData.description || ''}</p>
        <p><strong>Date of Issue:</strong> ${certificateData.date_of_issue || ''}</p>
        <p><strong>Roll Number:</strong> ${certificateData.roll_number || ''}</p>
        <p><strong>Registration Number:</strong> ${certificateData.regregistration_number || ''}</p>
        <p><strong>Date of Birth:</strong> ${certificateData.date_of_birth || ''}</p>
        <p><strong>Obtained:</strong> ${certificateData.obtained_the_degree_of || ''}</p>
        <p><strong>Description:</strong> ${certificateData.deploma_description || ''}</p>
        <p><strong>Marksheet Code:</strong> ${certificateData.marksheet_code || ''}</p>
        <p><strong>Student Pic:</strong> ${certificateData.student_pic ? `<img src="${process.env.REACT_APP_API_URL}/${certificateData.student_pic.picPath}/${certificateData.student_pic.picName}" alt="Student" width="100" />` : 'No image available'}</p>
        <!-- Add more certificate details as needed -->
      `;

      doc.html(content, {
        callback: function (doc) {
          doc.save('certificate.pdf');
        },
        x: 10,
        y: 10,
      });
    } else {
      alert('No certificate data available to download.');
    }
  };

  return (
    <div className="certificate-container">
   
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="row">
          {Object.keys(formData).map((key) => (
            <div key={key} className="col-md-4 form-group certificatecss">
              <label>
                {key.replace(/_/g, ' ').toUpperCase()}:
                <input
                  type={key === 'date_of_issue' ? 'date' : 'text'}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Certificate;
