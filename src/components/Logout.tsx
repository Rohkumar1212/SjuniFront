import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Marksheet from "./marksheet1";

const Logout: React.FC = () => {
  const history = useHistory();

  const logoutbtn = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    history.push("/login");
    window.location.reload();
  };

  return (
    <>
      <Button onClick={logoutbtn} className="btn btn-danger">
        Logout
      </Button> 
    </>
  );
};

export default Logout;
