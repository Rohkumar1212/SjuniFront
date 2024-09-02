import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MarksheetPreview.css';

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
  marksheet_description: string;
  student_name: string;
  registration_number: string;
  roll_number: string;
  sr_number: string;
  st_number: string;
  programme: string;
  passing_description: string;
  passing_criteria: string;
  marksheet_code: string;
  date_of_issue: string;
  subjects: Subject[]; 
  student_pic: File | null;

}

interface MarksheetPreviewProps {
  formData: FormData;
  onClose: () => void;
}

const MarksheetPreview: React.FC<MarksheetPreviewProps> = ({ formData, onClose }) => {
  return (
    <div className='modal' style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Marksheet Preview</h5>
            <button type="button" className='close' onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='background-div'>
            <p><strong>User ID:</strong> {formData.userId}</p>
            <p><strong>Consultant ID:</strong> {formData.consultantId}</p>
            <p><strong>University Name:</strong> {formData.universityName}</p>
            <p><strong>Marksheet Description:</strong> {formData.marksheet_description}</p>
            <p><strong>Student Name:</strong> {formData.student_name}</p>
            <p><strong>Registration Number:</strong> {formData.registration_number}</p>
            <p><strong>Roll Number:</strong> {formData.roll_number}</p>
            <p><strong>SR Number:</strong> {formData.sr_number}</p>
            <p><strong>ST Number:</strong> {formData.st_number}</p>
            <p><strong>Programme:</strong> {formData.programme}</p>
            <p><strong>Passing Description:</strong> {formData.passing_description}</p>
            <p><strong>Passing Criteria:</strong> {formData.passing_criteria}</p>
            <p><strong>Marksheet Code:</strong> {formData.marksheet_code}</p>
            <p><strong>Date of Issue:</strong> {formData.date_of_issue}</p>
            <h5>Subjects:</h5>
            {formData.subjects.map((subject, index) => (
              <div key={index}>
                <p><strong>Code:</strong> {subject.code}</p>
                <p><strong>Subject Details:</strong> {subject.subject_details}</p>
                <p><strong>Practical/Viva:</strong> {subject.year}</p>
                <p><strong>Session:</strong> {subject.session}</p>
                <p><strong>Max Number:</strong> {subject.max_number}</p>
                <p><strong>Total Number:</strong> {subject.total_number}</p>
                <hr />
              </div>
            ))}
            
            {formData.student_pic && (
              <div>
                <p><strong>Student Picture:</strong></p>
                <img src={URL.createObjectURL(formData.student_pic)} alt="Student" style={{ maxWidth: '100%' }} />
              </div>
            )}
           
            </div> </div>
          
          <div className='modal-footer'>
            <button type="button" className='btn btn-secondary' onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default MarksheetPreview;
