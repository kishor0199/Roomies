import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from 'axios';

const Login = ({ user }) => {
    
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await http.post("http://localhost:8080/api/auth", userDetails);
            localStorage.setItem("token", data);
            window.location = "/profile";
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            }
        }
    };
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 col-sm-8 offset-sm-2 mt-5 shadow-lg p-5 bg-white">
                    <form className='signup_form' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp"></input>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' onChange={handleChange} id="exampleInputPassword1"></input>
                        </div>
                        {error && (
                            <div className='error_container'>
                                <p className='form_error'>{error}</p>
                            </div>
                        )}
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
