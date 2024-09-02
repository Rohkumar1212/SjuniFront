import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./marksheet.css"; // Adjust the path according to your project structure

interface Subject {
  subjectName: string;
  maxMarks: number;
  obtainedMarks: number;
}

interface MarksheetData {
  name: string;
  universityName: string;
  fatherName: string;
  passing_semester: string;
  passing_year: string;
  programme: string;
  subjects: Subject[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
}

const Marksheet: React.FC = () => {
  const [marksheet, setMarksheet] = useState<MarksheetData>({
    name: "",
    fatherName: "",
    universityName: "",
    programme: "",
    passing_semester: "",
    passing_year: "",
    subjects: [],
    totalMarks: 0,
    obtainedMarks: 0,
    percentage: 0,
  });

  useEffect(() => {
    fetchMarksheet();
  }, []);

  const fetchMarksheet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/generateMarksheet/85gdSpxZAgqCEE31i1CBn35Dwf/${process.env.REACT_APP_API_KEY}/xvuvL0N5gW1wu01VFjsA57bQT9/6ywiKxsu1tu6hP4vXHR5RfEQuW`
      );
      setMarksheet(response.data);
    } catch (error) {
      console.error("Error fetching the marksheet", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const subjects = [...marksheet.subjects];
      subjects[index] = { ...subjects[index], [name]: value };
      setMarksheet({ ...marksheet, subjects });
    } else {
      setMarksheet({ ...marksheet, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/updateMarksheet`,
        marksheet
      );
      alert("Marksheet updated successfully");
    } catch (error) {
      console.error("Error updating the marksheet", error);
    }
  };

  return (
    <div className="marksheet-container">
      <h1>Marksheet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={marksheet.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>University Name:</label>
          <input
            type="text"
            name="universityName"
            value={marksheet.universityName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={marksheet.fatherName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Programme:</label>
          <input
            type="text"
            name="programme"
            value={marksheet.programme}
            onChange={handleInputChange}
          />
        </div>
        {marksheet.subjects.map((subject, index) => (
          <div key={index}>
            <label>Subject {index + 1}:</label>
            <input
              type="text"
              name="subjectName"
              value={subject.subjectName}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="number"
              name="maxMarks"
              value={subject.maxMarks}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="number"
              name="obtainedMarks"
              value={subject.obtainedMarks}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
        <div>
          <label>Total Marks:</label>
          <input
            type="number"
            name="totalMarks"
            value={marksheet.totalMarks}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Obtained Marks:</label>
          <input
            type="number"
            name="obtainedMarks"
            value={marksheet.obtainedMarks}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Percentage:</label>
          <input
            type="number"
            name="percentage"
            value={marksheet.percentage}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Marksheet</button>
      </form>
      <div id="main1">
        <h4>STUDENT MARKSHEET</h4>
        <div id="info">
          <h5 className="mt-2">STUDENT INFORMATION:</h5>
          <table>
            <tbody>
              <tr>
                <th>Name :</th>
                <td>{marksheet.name}</td>
                <th>Reg. No / Roll No: </th>
                <td>{/* Roll No can be added here */}</td>
              </tr>
              <tr>
                <th>Father Name :</th>
                <td>{marksheet.fatherName}</td>
                <th>Date of Birth :</th>
                <td>{/* Date of Birth can be added here */}</td>
              </tr>
              <tr>
                <th>Programme :</th>
                <td>{marksheet.programme}</td>
                <th>Batch :</th>
                <td>{/* Batch can be added here */}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="result">
          <h2>RESULT</h2>
          <table>
            <tbody>
              <tr>
                <th>TOTAL :</th>
                <td>{marksheet.obtainedMarks}</td>
                <th>PERCENTAGE :</th>
                <td>{marksheet.percentage}%</td>
              </tr>
              <tr>
                <th>GRADE :</th>
                <td>
                  {(() => {
                    if (marksheet.percentage >= 90) return "A";
                    if (marksheet.percentage >= 75) return "B";
                    if (marksheet.percentage >= 60) return "C";
                    if (marksheet.percentage >= 45) return "D";
                    return "F";
                  })()}
                </td>
                <th>PASS/FAIL :</th>
                <td>
                  {marksheet.subjects.every(
                    (subject) => subject.obtainedMarks >= 35
                  )
                    ? "PASS"
                    : "FAIL"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="mark">
        <h5>SUBJECTS MARKS</h5>
        <table>
          <thead>
            <tr>
              <th>SR. NO.</th>
              <th>SUBJECT NAME</th>
              <th>PASSING MARKS</th>
              <th>MARK OBTAINED</th>
              <th>GRADE</th>
            </tr>
          </thead>
          <tbody>
            {marksheet.subjects.map((subject, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.maxMarks}/35</td>
                <td>{subject.obtainedMarks}</td>
                <td>{subject.obtainedMarks >= 35 ? "PASS" : "FAIL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marksheet;
