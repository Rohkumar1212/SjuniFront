import React, { useState } from "react";
import "./style.css"; // Assuming you have some CSS for Topbar
import Profile from "./Profile";
import Logout from "./Logout";


interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const handleProfileClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="topbar">
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="offset-10 profile-container">
        <div className="profile" onClick={handleProfileClick}>
          <Profile />
        </div>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <Logout />
          </div>
        )}
      </div>
    </div>
  );


  
};

export default Topbar;
