import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';          

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    consultantId: "",
    userId: "",
    course: "",
    course_fee: "",
    paid_amount: "",
    QRCodes: null as File | null,
  });
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [sessionToken, setSessionToken] = useState<string>(""); // State for session token
  const [dataUploaded, setDataUploaded] = useState<boolean>(false); // State to track if data has been uploaded
  const [userId, setuserId] = useState<{ userId:string;}>(
    {
     
      userId:"",
     
    }
  );
  // Fetch session token on component mount
  useEffect(() => {
    const fetchSessionToken = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/getSessionToken`
        );
        setSessionToken(res.data.sessionToken);
      } catch (err) {
        console.error("Error fetching session token", err);
      }
    };

    fetchSessionToken();
  }, []);

  // Check if data has been uploaded on component mount
  useEffect(() => {
    const checkDataUploaded = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/api/v1/checkDataUploaded/${formData.consultantId}/${formData.userId}`;
        const res = await axios.get(url);
        setDataUploaded(res.data.uploaded); // Assuming API returns { uploaded: true/false }
      } catch (err) {
        console.error("Error checking if data uploaded", err);
      }
    };

    checkDataUploaded();
  }, [formData.consultantId, formData.userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        QRCodes: e.target.files[0],
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("consultantId", formData.consultantId);
      formDataToSend.append("sessionToken", sessionToken);
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("course", formData.course);
      formDataToSend.append("course_fee", formData.course_fee);
      formDataToSend.append("paid_amount", formData.paid_amount);
      if (formData.QRCodes) {
        formDataToSend.append("QRCodes", formData.QRCodes);
      }

      const url =
        `${process.env.REACT_APP_API_URL}/api/v1/uploadQRCode/${formData.consultantId}/UYrxr0BuxMOGjXqlO7DvDi07WL4KmYVo0ZW1UxEPz1G0a762Qew/${formData.userId}`;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(url, formDataToSend, config);
      setResponse(res.data);
      setShowPopup(true); // Show the success popup
      setFormData({
        consultantId: "",
        userId: "",
        course: "",
        course_fee: "",
        paid_amount: "",
        QRCodes: null as File | null,
      });
      setError(null);
      setDataUploaded(true); // Set dataUploaded to true after successful upload
    } catch (err: any) {
      console.error("Error posting data", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          setError(JSON.stringify(axiosError.response.data));
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>  
   
    <div className="container">
    <h3 className="text-center">Upload The Payment QRCode</h3>       
        <div className="card p-2">           
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="col-md-3">
          <label>Consultant ID:</label>
            <input
              type="text"
              name="consultantId"
              placeholder="Consultant ID"
              value={formData.consultantId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
          <label>User ID:</label>
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
          <label>Course:</label>
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          </div>
          <div className="col-md-3">
          <label>Course Fee:</label>
            <input
              type="number"
              name="course_fee"
              placeholder="Course Fee"
              value={formData.course_fee}
              onChange={handleChange}
              required
            />
          </div>{" "}
          <div className="col-md-4">
          <label>Paid Amount:</label>
            <input
              type="number"
              name="paid_amount"
              placeholder="Paid Amount"
              value={formData.paid_amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
          <label>QRCodes:</label>
            <input
              type="file"
              name="QRCodes"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Upload QR Code</button>
        </form>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <h2>Success!</h2>
              <p>{response && response.message}</p>
            </div>
          </div>
        )}

        {error && (
          <div>
            <h2>Error:</h2>
            <pre>{error}</pre>
          </div>
        )} 
         </div>      
</div>
    </>
  );
};

export default PaymentForm;
