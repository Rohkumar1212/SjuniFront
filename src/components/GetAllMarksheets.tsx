import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Subject {
  code: string;
  subject_details: string;
  year: string;
  session: string;
  max_number: number;
  total_number: number;
  _id: string;
}

interface Marksheet {
  QR_Code?: {
    qrPath: string;
    qrName: string;
  };
  student_pic?: {
    picPath: string;
    picName: string;
  };
  student_name: string;
  fathername: string;
  mothername: string;
  category: string;
  passing_semester: string;
  passing_year: string;
  registration_number: string;
  roll_number: string;
  programme: string;
  obtained_the_degree_of: string;
  date_of_issue: string;
  subjects: Subject[];
  _id: string;
}

const GetAllMarksheets = () => {
  const [data, setData] = useState<Marksheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarksheet, setSelectedMarksheet] = useState<Marksheet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMarksheets = async () => {
      try {
        const response = await axios.get<{ data: Marksheet[] }>(
          `${process.env.REACT_APP_API_URL}/api/v1/getAllMarksheets/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK`
        );
        setData(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarksheets();
  }, []);

  const handleViewDetails = (marksheet: Marksheet) => {
    setSelectedMarksheet(marksheet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMarksheet(null);
  };
  const handleDownloadPDF = async () => {
    if (modalContentRef.current && selectedMarksheet) {
      const canvas = await html2canvas(modalContentRef.current, {
        scale: 6, // Increase the scale further to increase resolution and size
      });
  
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Set quality to the highest
  
      const pdf = new jsPDF();
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Increase the number of pages to increase size
      const numPages = 1; // Create multiple pages with the same content
      for (let i = 0; i < numPages; i++) {
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
  
      // Load the student picture and add it to a fixed position on each PDF page
      if (selectedMarksheet.student_pic) {
        try {
          const studentPic = await loadImage(`${selectedMarksheet.student_pic.picPath}${selectedMarksheet.student_pic.picName}`);
          const imageWidth = 12; 
          // Adjust the width as needed
          const imageHeight = (studentPic.height * imageWidth) / studentPic.width;
  
          // Fixed position for the image on the PDF
          const imageXPosition = 153; // X position for the image (from the left)
          const imageYPosition = 23; // Y position for the image (from the top)
  
          for (let i = 0; i < numPages; i++) {
            pdf.setPage(i + 1); // Ensure the correct page is selected
            pdf.addImage(studentPic, 'JPEG', imageXPosition, imageYPosition, imageWidth, imageHeight);
          }
        } catch (err) {
          console.error('Error loading student picture:', err);
        }
      }
  
      // Save the PDF with a name that includes the student's name
      pdf.save(`${selectedMarksheet.student_name}_marksheet.pdf`);
    }
  };
  
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  };

  const calculateTotalMarks = () => {
    if (!selectedMarksheet) return 0;
    return selectedMarksheet.subjects.reduce((total, subject) => total + subject.total_number, 0);
  };

  const calculatePercentage = () => {
    if (!selectedMarksheet) return 0;
    const totalMarks = calculateTotalMarks();
    const maxMarks = selectedMarksheet.subjects.reduce((total, subject) => total + subject.max_number, 0);
    return (totalMarks / maxMarks) * 100;
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const getDivision = (percentage: number) => {
    if (percentage >= 60) return 'First';
    if (percentage >= 50) return 'Second';
    if (percentage >= 40) return 'Third';
    return 'Fail';
  };

  const convertNumberToWords = (amount: number): string => {
    const words = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    const atLeastOneNumber = (amount: number): string => {
      if (amount < 20) return words[amount];
      const tens = Math.floor(amount / 10);
      const units = amount % 10;
      return words[tens * 10] + (units ? ' ' + words[units] : '');
    };

    const numberToWords = (amount: number): string => {
      if (amount === 0) return 'Zero';
      if (amount >= 1000) return numberToWords(Math.floor(amount / 1000)) + ' Thousand ' + numberToWords(amount % 1000);
      if (amount >= 100) return numberToWords(Math.floor(amount / 100)) + ' Hundred ' + numberToWords(amount % 100);
      return atLeastOneNumber(amount);
    };

    return numberToWords(amount).trim();
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-5">
      <h4 className="text-center">All Marksheets</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Picture</th>
            <th>Student Name</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Category</th>
            <th>Roll Number</th>
            <th>Course Name</th>
            <th>Date of Issue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((marksheet) => (
            <tr key={marksheet._id}>
              <td>
                {marksheet.student_pic ? (
                  <img
                    src={`${marksheet.student_pic.picPath}${marksheet.student_pic.picName}`}
                    alt="Student Pic"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  'N/A'
                )}
              </td>
              <td>{marksheet.student_name}</td>
              <td>{marksheet.fathername}</td>
              <td>{marksheet.mothername}</td>
              <td>{marksheet.category}</td>
              <td>{marksheet.roll_number}</td>
              <td>{marksheet.programme}</td>
              <td>{marksheet.date_of_issue}</td>
              <td>
                <Button onClick={() => handleViewDetails(marksheet)} variant="info" className="mr-2 viewbtn">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedMarksheet && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Mark Sheet Details</Modal.Title>
          </Modal.Header>
          <Modal.Body ref={modalContentRef}>
            <div className="student-info">
              {selectedMarksheet.student_pic && (
                <img
                  src={`${selectedMarksheet.student_pic.picPath}${selectedMarksheet.student_pic.picName}`}
                  alt="Student Pic"
                  style={{ width: '100px', height: '100px' }}
                  className='profileimg'
                />
              )}
              <br />
              <div className='col-md-9 marksheetinfo'>
                <div className='col-md-4'>
                  <p><strong>Name:</strong> {selectedMarksheet.student_name}</p><br />
                  <p><strong>Father's Name:</strong> {selectedMarksheet.fathername}</p><br />
                  <p><strong>Mother's Name:</strong> {selectedMarksheet.mothername}</p><br /></div>
                <div className='col-md-4'>
                  <p><strong>Roll Number:</strong> {selectedMarksheet.roll_number}</p><br />
                  <p><strong>Registration Number:</strong> {selectedMarksheet.registration_number}</p><br />
                  <p><strong>Course Name:</strong> {selectedMarksheet.programme}</p>
                </div>
                <div className='col-md-4'>
                  <p><strong>Category:</strong> {selectedMarksheet.category}</p>  <br />
                  <p><strong>Degree Obtained:</strong> {selectedMarksheet.obtained_the_degree_of}</p><br />
                  <p><strong>Passing Semester:</strong> {selectedMarksheet.passing_semester}</p>
                 
                </div>
              </div>

              <Table className='marksheettable' striped bordered hover>
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Details</th>
                    <th>Practical/Viva</th>
                    <th>Session</th>
                    <th>Max Number</th>
                    <th>Total Number</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMarksheet.subjects.map((subject) => (
                    <tr key={subject._id}>
                      <td>{subject.code}</td>
                      <td>{subject.subject_details}</td>
                      <td>{subject.year}</td>
                      <td>{subject.session}</td>
                      <td>{subject.max_number}</td>
                      <td>{subject.total_number}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* New Section for Total Marks, Percentage, and Grade */}
              <div className="marks-summary marks-summary2">
                <div className='col-md-6'>
                  <p><strong>Grade:</strong> {getGrade(calculatePercentage())}</p><br />
                  <p><strong>Division:</strong> {getDivision(calculatePercentage())}</p><br />
                  <p><strong>Date of Issue:</strong> {selectedMarksheet.date_of_issue}</p><br />
                  <p><strong>Passing year:</strong> {selectedMarksheet.passing_year}</p><br />
                </div>
                <div className='col-md-6'>
                  <p><strong>Total Marks:</strong> {calculateTotalMarks()} ({convertNumberToWords(calculateTotalMarks())})</p><br />
                  <p><strong>Percentage:</strong> {calculatePercentage().toFixed(2)}%</p><br />
                  <p><strong>Passing Semester:</strong> {selectedMarksheet.passing_semester}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default GetAllMarksheets;
