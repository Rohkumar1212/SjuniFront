import React from "react";
import './style.css';

const Footer: React.FC = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        {/* Other content of the page */}
      </div>
      <div>       
          <footer className="d-flex flex-wrap justify-content-between align-items-right py-2 my-4 border-top">
            <div className="col-md-4  align-items-center">
              <a
                href="/"
                className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
              ></a>
              <span className="mb-3 mb-md-0 text-body-secondary">
                © 2024 Sj University, Inc
              </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">Home</svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">About</svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <svg className="bi" width="24" height="24">Contact</svg>
                </a>
              </li>
            </ul>
          </footer>        
      </div>
    </div>
  );
};

export default Footer;
