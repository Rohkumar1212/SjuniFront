import React from 'react';
import "../components/marksheet-1.css";

interface FormGroupProps {
  label: string;
  id: string;
  type?: string;
  name: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, id, type = "text", name }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} name={name} />
  </div>
);

interface SubjectRowProps {
  subjectName: string;
  marksName: string;
}

const SubjectRow: React.FC<SubjectRowProps> = ({ subjectName, marksName }) => (
  <tr>
    <td><input type="text" name={subjectName} /></td>
    <td><input type="number" name={marksName} /></td>
  </tr>
);

interface SignatureProps {
  label: string;
}

const Signature: React.FC<SignatureProps> = ({ label }) => (
  <div>
    <p>{label}</p>
    <p>____________________</p>
  </div>
);

const Marksheet: React.FC = () => {
  return (
    <div className="container">
      <h2>Mark Sheet</h2>
      <FormGroup label="Student Name:" id="studentName" name="studentName" />
      <FormGroup label="Father's Name:" id="fathersName" name="fathersName" />
      <FormGroup label="Mother's Name:" id="mothersName" name="mothersName" />
      <FormGroup label="Course Name:" id="courseName" name="courseName" />

      <div className="form-group">
        <label>Subjects and Marks:</label>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            <SubjectRow subjectName="subject1" marksName="marks1" />
            <SubjectRow subjectName="subject2" marksName="marks2" />
            {/* Add more SubjectRow components as needed */}
          </tbody>
        </table>
      </div>

      <FormGroup label="Total Marks:" id="totalMarks" type="number" name="totalMarks" />

      <div className="form-group">
        <label htmlFor="division">Division Earned:</label>
        <select id="division" name="division">
          <option value="first">First</option>
          <option value="second">Second</option>
          <option value="third">Third</option>
        </select>
      </div>

      <div className="signature">
        <Signature label="Signature of Student" />
        <Signature label="Signature of Teacher" />
        <Signature label="Signature of Principal" />
      </div>
    </div>
  );
}

export default Marksheet;
