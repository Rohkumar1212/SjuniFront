import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  fname: string;
  rollno: string;
  faname: string;
  bod: string;
  iname: string;
  batch: string;
  ename: string;
  seat: string;
  fend: string;
  bend: string;
  dbase: string;
  devops: string;
  mobile: string;
}

interface ResultData extends FormData {
  total: number;
  percentage: string;
  overallGrade: string;
  passFail: string;
  grades: {
    fend: string;
    bend: string;
    dbase: string;
    devops: string;
    mobile: string;
  };
}

const Marksheet: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    rollno: '',
    faname: '',
    bod: '',
    iname: '',
    batch: '',
    ename: '',
    seat: '',
    fend: '',
    bend: '',
    dbase: '',
    devops: '',
    mobile: ''
  });

  const [resultData, setResultData] = useState<ResultData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateGrade = (marks: number): string => {
    if (marks >= 80) return 'A1';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'D';
    return 'Fail';
  };

  const handleSubmit = async () => {
    const total = ['fend', 'bend', 'dbase', 'devops', 'mobile'].reduce(
      (acc, key) => acc + parseInt(formData[key as keyof FormData] || '0', 10),
      0
    );
    const percentage = (total * 100) / 500;
    const overallGrade = calculateGrade(percentage);
    const passFail = percentage >= 40 ? 'Pass' : 'Fail';

    const result: ResultData = {
      ...formData,
      total,
      percentage: percentage.toFixed(2) + '%',
      overallGrade,
      passFail,
      grades: {
        fend: calculateGrade(parseInt(formData.fend)),
        bend: calculateGrade(parseInt(formData.bend)),
        dbase: calculateGrade(parseInt(formData.dbase)),
        devops: calculateGrade(parseInt(formData.devops)),
        mobile: calculateGrade(parseInt(formData.mobile))
      }
    };

    setResultData(result);

    try {
      // Replace with your API endpoint
      await axios.post('http://localhost:5500/api/v1/generateMarksheet/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/KQn1i5kazL8sFsM6lDh5ZtNDdp/NatopjPkAZnNHM8go9SXkeRmhL', result);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleGet = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get('http://localhost:5500/api/v1/getMarksheet/HOlU7oBfQY5jxtPBRfSJPthhs2/aCL9hl5upFVDrxxmS5xj97fjkaU72vCeRUX6D08fgZfiWu2Dp8c/KQn1i5kazL8sFsM6lDh5ZtNDdp/oSycKmGbAAXHEIvmkPkjKZJFrQ');
      console.log('Data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '50px 0' }}>
      <div id="main" style={{ backgroundColor: '#FFFFFF', border: '5px double', paddingBottom: '50px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', fontSize: '2.5rem' }}>STUDENT MARKSHEET</h1>
        <div id="info" style={{ border: '2px solid rgb(182, 179, 179)', margin: '30px', fontWeight: 'bold' }}>
          <h2 style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', textDecoration: 'underline' }}>STUDENT INFORMATION:</h2>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <th>Name :</th>
                <td><input type="text" name="fname" value={formData.fname} onChange={handleChange} /></td>
                <th>Reg. No / Roll No: </th>
                <td><input type="number" name="rollno" value={formData.rollno} onChange={handleChange} /></td>
              </tr>
              <tr>
                <th>Father Name :</th>
                <td><input type="text" name="faname" value={formData.faname} onChange={handleChange} /></td>
                <th>Date of Birth :</th>
                <td><input type="date" name="bod" value={formData.bod} onChange={handleChange} /></td>
              </tr>
              <tr>
                <th>Institute Name :</th>
                <td><input type="text" name="iname" value={formData.iname} onChange={handleChange} /></td>
                <th>Batch :</th>
                <td><input type="text" name="batch" value={formData.batch} onChange={handleChange} /></td>
              </tr>
              <tr>
                <th>Exam Month-year :</th>
                <td><input type="text" name="ename" value={formData.ename} onChange={handleChange} /></td>
                <th>Seat No.:</th>
                <td><input type="text" name="seat" value={formData.seat} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="mark" style={{ border: '2px solid rgb(182, 179, 179)', margin: '30px', fontWeight: 'bold' }}>
          <h2 style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', textDecoration: 'underline' }}>SUBJECTS MARKS</h2>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <th>SR. NO.</th>
                <th>SUBJECT NAME</th>
                <th>PASSING MARKS</th>
                <th>MARK OBTAINED</th>
              </tr>
              {['fend', 'bend', 'dbase', 'devops', 'mobile'].map((subject, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{subject.toUpperCase().replace('_', ' ')}</td>
                  <td>100/35</td>
                  <td><input type="number" name={subject} value={formData[subject as keyof FormData]} onChange={handleChange} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleSubmit} className="btn" style={{ textAlign: 'center', marginLeft: '150px', padding: '8px 20px', backgroundColor: 'black', border: 'none', color: 'white', fontSize: '1rem', borderRadius: '10px' }}>SUBMIT</button>
        <button onClick={handleGet} className="btn" style={{ textAlign: 'center', marginLeft: '150px', padding: '8px 20px', backgroundColor: 'black', border: 'none', color: 'white', fontSize: '1rem', borderRadius: '10px' }}>RESENT</button>
      </div>

      {resultData && (
        <div id="main1" style={{ backgroundColor: '#FFFFFF', border: '5px double', paddingBottom: '50px', width: '100%' }}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', fontSize: '2.5rem' }}>STUDENT MARKSHEET</h1>
          <div id="info" style={{ border: '2px solid rgb(182, 179, 179)', margin: '30px', fontWeight: 'bold' }}>
            <h2 style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', textDecoration: 'underline' }}>STUDENT INFORMATION:</h2>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th>Name :</th>
                  <td>{resultData.fname}</td>
                  <th>Reg. No / Roll No: </th>
                  <td>{resultData.rollno}</td>
                </tr>
                <tr>
                  <th>Father Name :</th>
                  <td>{resultData.faname}</td>
                  <th>Date of Birth :</th>
                  <td>{resultData.bod}</td>
                </tr>
                <tr>
                  <th>Institute Name :</th>
                  <td>{resultData.iname}</td>
                  <th>Batch :</th>
                  <td>{resultData.batch}</td>
                </tr>
                <tr>
                  <th>Exam Month-year :</th>
                  <td>{resultData.ename}</td>
                  <th>Seat No.:</th>
                  <td>{resultData.seat}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="mark" style={{ border: '2px solid rgb(182, 179, 179)', margin: '30px', fontWeight: 'bold' }}>
            <h2 style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 'bold', textDecoration: 'underline' }}>SUBJECTS MARKS</h2>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th>SR. NO.</th>
                  <th>SUBJECT NAME</th>
                  <th>PASSING MARKS</th>
                  <th>MARK OBTAINED</th>
                  <th>GRADE</th>
                </tr>
                {['fend', 'bend', 'dbase', 'devops', 'mobile'].map((subject, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{subject.toUpperCase().replace('_', ' ')}</td>
                    <td>100/35</td>
                    <td>{resultData[subject as keyof FormData]}</td>
                    <td>{resultData.grades[subject as keyof ResultData['grades']]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table style={{ width: '100%', marginTop: '20px' }}>
              <tbody>
                <tr>
                  <td  style={{ fontWeight: 'bold' }}>TOTAL:</td>
                  <td>{resultData.total}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>PERCENTAGE:</td>
                  <td>{resultData.percentage}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>OVERALL GRADE:</td>
                  <td>{resultData.overallGrade}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>RESULT:</td>
                  <td>{resultData.passFail}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marksheet;
