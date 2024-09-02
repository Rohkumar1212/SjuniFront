import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './Certificate.css'; // Import the CSS file for styling
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import html2canvas from 'html2canvas'; // Import html2canvas for capturing HTML content

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
  const [showCertificate, setShowCertificate] = useState(false);

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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = (formData as any)[key];
        formDataToSend.append(key, value);
      });

      // Construct the URL with consultantId and userId dynamically
      const url = `${process.env.REACT_APP_API_URL}/api/v1/generateCertificate/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK/${formData.consultantId}/${formData.userId}`;

      const response = await axios.post(
        url, // URL as a string
        formDataToSend, // Payload (data)
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`, // Include API Key if needed
          },
        } // Config
      );
      
      setCertificateData(response.data); // Assuming response.data contains certificate details
      setShowCertificate(true);
      alert('Certificate details submitted successfully!');
    } catch (error) {
      console.error('Error submitting certificate details', error);
      alert('Failed to submit certificate details');
    }
  };

  const handleClick = () => {
    setShowCertificates(true);
  };

  const downloadPDF = () => {
    if (certificateData) {
      html2canvas(document.querySelector("#certificate-popup")!).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
               pdf.save('certificate.pdf');
      });
    } else {
      alert('No certificate data available to download.');
    }
  };

  return (
    <div className="certificate-container">
      <div>
        <button onClick={handleClick}>Get Certificates</button>
      </div>
      {showCertificates}
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="row">
          {Object.keys(formData).map((key) => (
            <div key={key} className="col-md-3 form-group">
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
      {/* Render the certificate display component conditionally */}
      {showCertificate && (
        <div id="certificate-popup" className="certificate-popup">
          <h2>Certificate Details</h2>
          <p><strong>Name:</strong> {certificateData?.name}</p>
          <p><strong>Course:</strong> {certificateData?.course}</p>
          <p><strong>University:</strong> {certificateData?.university_name}</p>
          <p><strong>Description:</strong> {certificateData?.description}</p>
          <p><strong>Date of Issue:</strong> {certificateData?.date_of_issue}</p>
          {/* Add more certificate details as needed */}
          <button onClick={downloadPDF} className="download-button">Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default Certificate;
