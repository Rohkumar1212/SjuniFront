import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Getallcertificates.css'; // Make sure this path is correct
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateData {
  university_name: string;
  student_name: string;
  course_name: string;
  description: string;
  diploma_certificate_heading: string;
  this_is_to_certify: string;
  obtained_the_degree_of: string;
  deploma_description: string;
  date_of_issue: string;
 
}

const GetCertificates: React.FC = () => {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get<any>('http://localhost:5500/api/v1/getCertificate/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/x2edJdxCL2neEIp8qt8mzLpgY5/1dfFqmSVcZwgvLItOeuiMoXVnJ');
        const certificateData = response.data.data; // Assuming your data is nested under 'data'

        if (certificateData) {
          setCertificateData({
            university_name: certificateData.university_name,
            student_name: certificateData.student_name,
            course_name: certificateData.course_name,
            description: certificateData.description,
            diploma_certificate_heading: certificateData.diploma_certificate_heading,
            this_is_to_certify: certificateData.this_is_to_certify,
            obtained_the_degree_of: certificateData.obtained_the_degree_of,
            deploma_description: certificateData.deploma_description,
            date_of_issue: certificateData.date_of_issue,

          });
        } else {
          console.error('No data found in API response');
        }
      } catch (error) {
        console.error('Error fetching certificate data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, []);

  const handleDownload = () => {
    if (certificateData) {
      const filename = 'certificate.pdf';

      html2canvas(document.querySelector('.certificate-display') as HTMLElement).then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size: 210 x 297 mm

        pdf.save(filename);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!certificateData) {
    return <div>No certificate data found.</div>;
  }

  return (
    <div className="certificate-display">
      <h2>Certificate Details</h2>
      <div className="certificate-fields">
        <div className="certificate-field">
          <strong>University:</strong> {certificateData.university_name}
        </div>
        <div className="certificate-field">
          <strong>course_name:</strong> {certificateData.course_name}
        </div>
        <div className="certificate-field">
          <strong>student_name:</strong> {certificateData.student_name}
        </div>
        <div className="certificate-field">
          <strong>Description:</strong> {certificateData.description}
        </div>
        <div className="certificate-field">
          <strong>Diploma Certificate Heading:</strong> {certificateData.diploma_certificate_heading}
        </div>
        <div className="certificate-field">
          <strong>This is to Certify:</strong> {certificateData.this_is_to_certify}
        </div>
        <div className="certificate-field">
          <strong>Obtained the Degree of:</strong> {certificateData.obtained_the_degree_of}
        </div>
        <div className="certificate-field">
          <strong>Diploma Description:</strong> {certificateData.deploma_description}
        </div>
        <div className="certificate-field">
          <strong>Date of Issue:</strong> {certificateData.date_of_issue}
        </div>
       
      </div>
      <button className='Download' onClick={handleDownload}>Download Certificate PDF</button>
    </div>
  );
};

export default GetCertificates;
