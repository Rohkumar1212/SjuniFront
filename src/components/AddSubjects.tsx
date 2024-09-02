import React, { useState } from "react";
import "./AddSubjects.css"; // Import CSS file for styling

const AddSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [code, setCode] = useState<string>("");
  const [subjectDetails, setSubjectDetails] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [maxNumber, setMaxNumber] = useState<string>("");
  const [totalNumber, setTotalNumber] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const addSubject = () => {
    const newSubject = {
      code,
      subject_details: subjectDetails,
      year,
      session,
      max_number: maxNumber,
      total_number: totalNumber,
    };

    setSubjects([...subjects, newSubject]);

    // Clear input fields
    setCode("");
    setSubjectDetails("");
    setYear("");
    setSession("");
    setMaxNumber("");
    setTotalNumber("");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/addSubjects/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/VSSrlt1RfDNHifdrFbAx5djfua/zl0EIEOqYEcUUiQiERyYka4LpH",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjects }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear subjects list
      setSubjects([]);

      // Show success popup
      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Add Subjects</h1>
        <div className="form-group">
          <label>
            Code:
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Subject Details:
            <input
              type="text"
              value={subjectDetails}
              onChange={(e) => setSubjectDetails(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Year:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Session:
            <input
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Max Number:
            <input
              type="text"
              value={maxNumber}
              onChange={(e) => setMaxNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Total Number:
            <input
              type="text"
              value={totalNumber}
              onChange={(e) => setTotalNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-buttons">
          <button onClick={addSubject}>Add Subject</button>
          <button onClick={handleSubmit}>Submit All</button>
        </div>

        {isSuccess && (
          <div className="popup">
            <p>Submission successful!</p>
            <button onClick={() => setIsSuccess(false)}>Close</button>
          </div>
        )}

        <div className="subject-list">
          <h2>Subjects to Submit:</h2>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>
                {subject.code} - {subject.subject_details} - {subject.year} -{" "}
                {subject.session} - {subject.max_number} - {subject.total_number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddSubjects;
