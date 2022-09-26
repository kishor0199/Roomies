import React from 'react'
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminlogo from "../../images/adminlogo.jpg";
import userlogo from "../../images/userlogo.jpg";
import ownerlogo from "../../images/ownerlogo.jpg";

function RegistrationWindow({ user }) {

    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="card-group mt-5 ">
                    <div className="m-5 card shadow-lg" style={{ height: '410px' }}>
                        <img src={adminlogo} className="card-img-top shadow-sm" alt="Admin" />
                        <div className="card-body">
                            <h5 className="card-title">Register as Admin</h5>
                            <p className="card-text">Review listing and check for report and spams</p>

                            <Link to="/protectedregistration" state={{ usertype: "admin" }}><button className='btn btn-outline-secondary w-100 shadow-sm'>Register</button></Link>
                        </div>
                    </div>
                    <div className=" m-5 card shadow-lg" style={{ height: '410px' }}>
                        <img src={userlogo} className="card-img-top shadow-sm" alt="User" />
                        <div className="card-body">
                            <h5 className="card-title">Register as User</h5>
                            <p className="card-text">Let's Find Flats And Hostel Which Suits Your budget!!</p>
                            <Link to="/protectedregistration" state={{ usertype: "user" }}><button className='btn btn-outline-primary w-100 shadow-sm'>Register</button></Link>
                        </div>
                    </div>
                    <div className="m-5 card shadow-lg" style={{ height: '410px' }}>
                        <img src={ownerlogo} className="card-img-top" alt="Owner" />
                        <div className="card-body">
                            <h5 className="card-title">Register as Owner</h5>
                            <p className="card-text">Login and List Flats Hostel also View Customers Request</p>
                            <Link to="/protectedregistration" state={{ usertype: "owner" }}><button className='btn btn-outline-warning w-100 shadow-sm'>Register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationWindow;