import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainContent from './MainContent';
import Home from './Home';
import StudentsData from './StudentsData';
import ConsultantData from './ConsultantData';
import MarkSheetData from './MarkSheetData';
// import MakeMarkSheet from './MakeMarksheet';
import AddEducation from './AddEducation';
// import AddSubjects from './AddSubjects';
import Profile from './Profile';
import GetAllCertificate from './GetAllCertificate';
import Certificate from './Certificate';
import PaymentQRcode from './PaymentQRcode';
import Settings from './Settings';
import Footer from './Footer';
import GetAllMarksheets from './GetAllMarksheets';
import Logout from './Logout';
import './style.css';

const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = (e: React.MouseEvent) => {
        if (sidebarOpen && e.target instanceof HTMLElement && !e.target.closest('.sidebar')) {
            setSidebarOpen(false);
        }
    };

    return (
        <Router>
            <div className="dashboard-container" onClick={closeSidebar}>
                <Topbar toggleSidebar={toggleSidebar} />
                <div className={`main-content-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <Sidebar sidebarOpen={sidebarOpen} />
                    <MainContent>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/StudentsData" component={StudentsData} />
                            <Route path="/ConsultantData" component={ConsultantData} />
                            <Route path="/MarkSheetData" component={MarkSheetData} />
                            {/* <Route path="/MakeMarkSheet" component={MakeMarkSheet} /> */}
                            <Route path="/GetAllMarksheets" component={GetAllMarksheets} />
                            <Route path="/AddEducation" component={AddEducation} />
                            {/* <Route path="/AddSubjects" component={AddSubjects} /> */}
                            <Route path="/GetAllCertificate" component={GetAllCertificate} />
                            <Route path="/Certificate" component={Certificate} />
                          
                            <Route path="/Profile" component={Profile} />
                            <Route path="/PaymentQRcode" component={PaymentQRcode} />
                            <Route path="/Logout" component={Logout} />
                            <Route path="/settings" component={Settings} />
                        </Switch>
                    </MainContent>
                </div>
                {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
                <Footer />
            </div>
        </Router>
    );
};

export default Dashboard;
