import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Create as CreateIcon,
  Assignment as AssignmentIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/Sj-logo-dashboard.png";
import "./Sidebar.css";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const handleSidebarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`sidebar ${sidebarOpen ? "open" : ""}`}
      onClick={handleSidebarClick}
    >
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <List component="nav" className="sidebar-list">
        {/* <ListItem
          button
          component={NavLink}
          exact
          to="/"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem> */}
        <ListItem
          button
          component={NavLink}
          to="/StudentsData"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="StudentsData" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/ConsultantData"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="ConsultantData" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/MarkSheetData"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="GenerateMarksheet" />
        </ListItem>
        {/* <ListItem
          button
          component={NavLink}
          to="/MarkSheetData"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="MarkSheetData" />
        </ListItem> */}
        <ListItem
          button
          component={NavLink}
          to="/GetAllMarksheets"
          activeClassName="active-link"
        >
           <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="GetAllMarksheets" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/PaymentQRcode"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="PaymentQRcode" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/AddEducation"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="New Admissions" />
        </ListItem>

        {/* <ListItem
          button
          component={NavLink}
          to="/AddSubjects"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="AddSubjects" />
        </ListItem> */}
        <ListItem
          button
          component={NavLink}
          to="/GetAllCertificate"
          activeClassName="active-link"
        >
           <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="GetAllCertificate" />
        </ListItem>
       
        <ListItem
          button
          component={NavLink}
          to="/Certificate"
          activeClassName="active-link"
        >
           <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Certificate" />
        </ListItem>
         <ListItem
          button
          component={NavLink}
          to="/Logout"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/settings"
          activeClassName="active-link"
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
