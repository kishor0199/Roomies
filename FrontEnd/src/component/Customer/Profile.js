import React, { useEffect, useState } from "react";
import http from "axios";


const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserProfile().then(user => setUser(user));
    }, []);

    const getUserProfile = async () => {
        const response = await http.get("http://localhost:8080/api/user");
        var { data } = response;
        console.log(data);
        return data;
    };

    if (user === null) {
        return <p>Loading profile...</p>;
    }

    return (<> <div className="container">
        <div className="card mt-5">
            <div className="row g-0">
                <div className="col bg-light">
                    <div className="m-3 p-2">
                        <h1 className="text-primary">
                            Welcome {user && user.name}
                        </h1>
                        <h2>
                            <p>How are You !</p>
                        </h2>
                        <h3>
                          {user.Owner && <> <p>Let's List Flats / Hostel! and find a customer</p></>}
                          {user.User && <> <p>Let's Find Flats / Hostel For you</p></>}
                          {user.role === 4 && <> <p>You are Admin</p></>}
                        </h3>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"></h5>
                        <h1 className="ms-5">Your Profile</h1>
                        <div className="row">
                            <div className="col-6">
                                <table className="table table-borderless mt-5 ms-5">
                                    <tbody>
                                        <tr>
                                            <td width="200px">Email</td>
                                            <td>{user && user.email}</td>
                                        </tr>
                                        <tr>
                                            <td width="200px">Name</td>
                                            <td width={"200px"}>{user && user.name}{user.Owner && <> {user.Owner.namelast} </>}{user.User && <>&nbsp; {user.User.namelast} </>}</td>
                                        </tr>{user.role !== 4 &&
                                            <tr>
                                                <td width="200px">Occupation</td>
                                                <td>{user.Owner && <> {user.Owner.occupation} </>}{user.User && <>{user.User.namelast} </>}</td>
                                            </tr>}
                                            {user.role !== 4 &&
                                        <tr>
                                            <td width="200px">Date Of Birth</td>
                                            <td>{user.Owner && <> {user.Owner.dob} </>}{user.User && <>{user.User.dob} </>}</td>
                                        </tr>}{user.role !== 4 &&
                                        <tr>
                                            <td width="200px">age</td>
                                            <td>{user.Owner && <> {user.Owner.age} </>}{user.User && <>{user.User.age} </>}</td>
                                        </tr>}{user.role !== 4 &&
                                        <tr>
                                            <td width="200px">State</td>
                                            <td>{user.Owner && <> {user.Owner.state} </>}{user.User && <>{user.User.state} </>}</td>
                                        </tr>}{user.role !== 4 &&
                                        <tr>
                                            <td width="200px">City</td>
                                            <td>{user.Owner && <> {user.Owner.city} </>}{user.User && <>{user.User.city} </>}</td>
                                        </tr>}{user.role !== 4 &&
                                        <tr>
                                            <td width="200px">Gender</td>
                                            <td>{user.Owner && <> {user.Owner.gender} </>}{user.User && <>{user.User.gender} </>}</td>
                                        </tr>}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div class="col-6">
                            <h1></h1>
                        </div> */}
                        </div>
                        <p className="card-text mt-5">
                            <small className="text-muted">We never share your any information to anyone </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div></>);
};

export default Profile;
