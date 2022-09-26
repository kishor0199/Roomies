import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ownerservice from "../../serivces/OwnerService";
import phoneservice from "../../serivces/PhoneService";

function UpdateOwner() {
  let id = useParams().id;

  let [owner, setOwner] = useState({});

  useEffect((e) => {
    getData();
  }, []);

  const getData = () => {
    ownerservice.getOwnerById(id).then((res) => {
      owner = res.data[0];
      setOwner(owner);
    });
  phoneservice.getOwnerPhone(id).then((res) => {
    if (res.data.length === 2) {
      let p1 = res.data[0].phone;
      let p2 = res.data[1].phone;
      owner["phone_no1"] = p1;
      owner["phone_no2"] = p2;
    } else if (res.data.length === 1) {
      let p1 = res.data[0].phone;
      owner["phone_no1"] = p1;
    }
  });
  }
  async function submit(e) {
    e.preventDefault();
    ownerservice.updateOwner(owner);
    alert("Owner Updated");

    setOwner({
      namefirst: "",
      namelast: "",
      dob: "",
      age: "",
      gender: "",
      occupation: "",
      city: "",
      state: "",
      email: "",
    });
    window.location.replace("http://localhost:3000/owner/list");
  }

  function onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setOwner({ ...owner, [name]: [value].toString() });
  }

  return (
    <div className="container col-6 mt-5 border border-dark  bg-white rounded">
      <form onSubmit={submit}>
        <div className="mb-3 mt-4">
          <label for="" className="form-labe  fw-bold">
            First Name
          </label>
          <input
            type="text"
            name="namefirst"
            id="namefirst"
            onChange={onChange}
            value={owner.namefirst}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-labe  fw-bold">
            Last Name
          </label>
          <input
            type="text"
            name="namelast"
            id="namelast"
            onChange={onChange}
            value={owner.namelast}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-labe  fw-bold">
            DOB
          </label>
          <input
            type="date"
            name="dob"
            onChange={onChange}
            value={owner.dob}
            className="form-control"
            formate="yyyy-mm-dd"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-labe  fw-bold">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={onChange}
            value={owner.age}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3">
          <label for="" className="form-labe  fw-bold">
            Gender
          </label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={owner.gender === "male"}
              onChange={onChange}
            />
            <label className="form-check-label fw-bold" for="inlineRadio1">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              checked={owner.gender === "female"}
              value="female"
              onChange={onChange}
            />
            <label className="form-check-label fw-bold" for="inlineRadio2">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="other"
              checked={owner.gender === "other"}
              onChange={onChange}
            />
            <label className="form-check-label fw-bold" for="inlineRadio2">
              Other
            </label>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            id="occupation"
            onChange={onChange}
            value={owner.occupation}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={onChange}
            value={owner.city}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            onChange={onChange}
            value={owner.state}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={onChange}
            value={owner.email}
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            Mobile Number:
          </label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">+91</div>
            </div>
            <input
              type="number"
              pattern="[7-9]{1}[0-9]{9}"
              className="form-control"
              maxLength={10}
              name="phone_no1"
              placeholder=""
              onChange={onChange}
              value={owner.phone_no1}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label for="" className="form-labe  fw-bold">
            Alternate Mobile Number:
          </label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">+91</div>
            </div>
            <input
              type="number"
              pattern="[7-9]{1}[0-9]{9}"
              className="form-control"
              maxLength={10}
              name="phone_no2"
              placeholder=""
              onChange={onChange}
              value={owner.phone_no2}
            />
          </div>
        </div>
        <div className="mb-3 mt-3">
          <input
            type="submit"
            value="Update"
            name=""
            id=""
            className="btn btn-warning fw-bold"
            aria-describedby="helpId"
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateOwner;
