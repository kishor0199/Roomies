import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import http from "axios";
import falt45logo from "../../images/flat45.jpg";
import { useFormik } from "formik";
import RegistrationSchema  from "./validationschema/RegistrationSchema";


const Register = ({ user }) => {
    const location = useLocation()
    let usertype;
    try{
        usertype = location.state;
    }catch{
        navigate("/")
    };
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
        if(!usertype){
            alert("Unauthorized Access");
            navigate("/");
        }
    }, []);


    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dob: "",
        occupation: "",
        cpassword: "",
        gender: "",
        state: "",
        city: "",
        usertype:usertype, 
        isAdmin:false  
    }

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: RegistrationSchema,
        onSubmit: async (values) => {
            console.log(values);
            try {
                const { data } = await http.post("http://localhost:8080/api/user", values);
                localStorage.setItem("token", data);
                window.location = "/profile";
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    console.log(error.response.data);
                    errors.response = error.response.data;
                    console.log(errors);
                }
            }
        },
    });
    
    console.log(values);
    if( usertype && usertype.usertype === "admin"){
        values.isAdmin = true;
    }

            
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col shadow-lg">
                        <div className="row">
                            <div className="col-7 p-5 bg-light">
                                {usertype && <p className="text-center">Registering As {usertype.usertype}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <label htmlFor="namefirst" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                className="form-control"
                                                id="namefirst"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.firstname && touched.firstname && <div class="form-text text-danger">{errors.firstname}</div>}
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="lastname" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                className="form-control"
                                                id="lastname"
                                                value={values.lastname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.lastname && touched.lastname && <div class="form-text text-danger">{errors.lastname}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email && <div class="form-text text-danger">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="password" className="form-label">
                                                Tell Us Your Birthday
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                className="form-control"
                                                id="dob"
                                                value={values.dob}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.dob && touched.dob && <div class="form-text text-danger">{errors.dob}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <label htmlFor="state" className="form-label">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                className="form-control"
                                                id="state"
                                                value={values.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.state && touched.state && <div class="form-text text-danger">{errors.state}</div>}
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="city" className="form-label">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control"
                                                id="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.city && touched.city && <div class="form-text text-danger">{errors.city}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <div className="form-check form-check-inline">
                                                <p>I Am</p>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    Value="male"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio1">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="inlineRadio2"
                                                    Value="female"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio2">
                                                    Female
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="inlineRadio3"
                                                    Value="other"   
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio3">
                                                    Other
                                                </label>
                                            </div>
                                            {errors.gender && touched.gender && <div class="form-text text-danger">{errors.gender}</div>}
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="occupation" className="form-label">
                                                Tell Us Your Occupation
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={25}
                                                name="occupation"
                                                className="form-control"
                                                id="occupation"
                                                value={values.occupation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.occupation && touched.occupation && <div class="form-text text-danger">{errors.occupation}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-6">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.password && touched.password && <div class="form-text text-danger">{errors.password}</div>}
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label htmlFor="password" className="form-label">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="cpassword"
                                                className="form-control"
                                                id="cpassword"
                                                value={values.cpassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.cpassword && touched.cpassword && <div class="form-text text-danger">{errors.cpassword}</div>}
                                        </div>
                                    </div>
                                    <div>{usertype &&<input type="hidden" name="usertype" defaultValue={usertype.usertype} disabled />}</div>
                                    <button type="submit" className="btn btn-primary w-25 me-5">
                                        Submit
                                    </button>
                                    <button type="reset" onClick={resetForm} className="btn btn-danger">
                                        Reset
                                    </button>
                                    {errors.response && <div class="form-text text-danger">{errors.response}</div>}
                                    {errors.usertype && <div class="form-text text-danger">{errors.usertype}</div>}

                                </form>
                            </div>
                            <div className=" col-5 p-0 img-fluid">
                                <div className="img-fluid">
                                    <img
                                        className="img-fluid"
                                        src={falt45logo}
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                        alt="flatImage"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
