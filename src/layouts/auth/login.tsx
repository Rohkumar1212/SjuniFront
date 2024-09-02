import axios from 'axios';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [usrForm, setUserForm] = useState({ email: "", password: "" });
    const history = useHistory();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post("http://localhost:5500/api/v1/loginSuperAdmin", usrForm);
            const { data } = response.data;
            const { token } = data;

            // Store token in localStorage
            localStorage.setItem("token", token);

            // Redirect to the dashboard upon successful login
            history.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            // Handle login error here
        }
    };

    return (
        <div className='container imgsection'>
            <div className='row loginsection'>
                <Card>
                    <form className="row adminimg" onSubmit={submit}>
                        <div className="col-md-6 col-sm-6 loginform">
                            <div className='admin'><h1>Admin Login</h1></div>
                            <label htmlFor="inputEmail4" className="form-label">User Name</label>
                            <input type="text" className='form-control' value={usrForm.email} onChange={(e) => setUserForm({ ...usrForm, email: e.target.value })} />
                            <br />
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input type='password' className='form-control' value={usrForm.password} onChange={(e) => setUserForm({ ...usrForm, password: e.target.value })} />
                            <div className="col-12 mt-5">
                                <button type="submit" className="btn btn-success">Sign in</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <div className='imgadmin mb-2 mt-2'>
                                    {/* Add your image component here */}
                                </div>
                            </Card>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
