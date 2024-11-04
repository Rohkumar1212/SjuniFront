import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Generatemarksheet.css";
import "./Getallcertificates.css";

// Define the type for the certificate data
interface StudentPic {
  picName: string;
  picPath: string;
}

interface CertificateData {
  student_pic: StudentPic;
  student_name: string;
  fathername: string;
  roll_number: string;
  course_name: string;
  deploma_description: string;
  date_of_birth: string;
  obtained_the_degree_of: string;
  date_of_issue: string;
  description?: string; // Optional field
}

const GetAllCertificate: React.FC = () => {
  const [data, setData] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [modalData, setModalData] = useState<CertificateData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/getAllCertificates/xvuvL0N5gW1wu01VFjsA57bQT9/tc0qSUh0NMuoy4VmH3L3T3tV0fDKFCZnLU9FbghoDHUKrfKcUgK`
      )
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleViewClick = (data: CertificateData) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleDownloadPDF = () => {
    if (modalData) {
      const modal = document.getElementById("certificate-modal");
      if (modal) {
        html2canvas(modal, {
          scale: 2, // Increase scale for better resolution
          useCORS: true, // Use this to enable cross-origin images
          logging: true,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
          });
          pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
          pdf.save("certificate.pdf");
        });
      }
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data.length) {
    return <p>No data available</p>;
  }

  return (
    <div className="container">
      <h4 className="text-center">Get All Certificates</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {[
                "Student Picture",
                "Student Name",
                "Father's Name",
                "Roll Number",
                "Course Name",
                "Date of Birth",
                "Degree",
                "Date of Issue",
                "Action",
              ].map((label, index) => (
                <th key={index}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((certificate, index) => (
              <tr key={index}>
                <td>
                  {certificate.student_pic ? (
                    <img
                      className="student-pic"
                      src={`${certificate.student_pic.picPath}${certificate.student_pic.picName}`}
                      alt="Student Pic"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{certificate.student_name || "N/A"}</td>
                <td>{certificate.fathername || "N/A"}</td>
                <td>{certificate.roll_number || "N/A"}</td>
                <td>{certificate.course_name || "N/A"}</td>
                <td>{certificate.date_of_birth || "N/A"}</td>
                <td>{certificate.obtained_the_degree_of || "N/A"}</td>
                <td>{certificate.date_of_issue || "N/A"}</td>
                <td>
                  <button onClick={() => handleViewClick(certificate)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && modalData && (
        <div className="modal">
          <div
            className="modal-content certificatespopup"
            id="certificate-modal"
          >
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="certificateheading">
              <span>Certificate Details</span>
            </h2>
            <img
              className="modal-student-pic"
              src={`${modalData.student_pic.picPath}${modalData.student_pic.picName}`}
              alt="Student Pic"
            />
            <p className="dateofissues">
              <strong>Date of Issue:</strong> {modalData.date_of_issue}
            </p>
            <br />
            <p className="rollnumber">
              <strong>Roll Number:</strong> {modalData.roll_number}
            </p>
            <br />

            <div className="row">
              <div className="col-md-12">
                <p className="studentsname">{modalData.student_name}</p> <br />
                <p className="studentsCourse">{modalData.course_name}</p>
                <br />
                {/* <p><strong>Date of Birth:</strong> {modalData.date_of_birth}</p><br/> */}
              </div>
              <div className="col-md-12">
                <p className="deploma_description">
                  {" "}
                  {modalData.deploma_description}
                </p>
                <br />
                <p className="Degree"> {modalData.obtained_the_degree_of}</p>
                <br />
                <p className="Description">{modalData.description || "N/A"}</p>
                <br />
                <button className="dowbtn" onClick={handleDownloadPDF}>
                  Download PDF
                </button>
              </div>
            </div>

            {/* New section for marks summary */}
            <div className="marks-summary">
              <div className="top-border"></div>
              <div className="summary-content">                
              </div>
              <div className="bottom-border"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllCertificate;
