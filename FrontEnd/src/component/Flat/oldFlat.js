
import React, { useState } from "react";

import flatservice from "../../serivces/FlatService";

function Flat({ user }) {

  const flat = {
    owner_id: user.id,
    flat_type: "select",
    requirement: "select",
    no_of_members: "select",
    deposite: "",
    rent: "",
    is_wifi_available: 0,
    is_tv_available: 0,
    is_parking_available: 0,
    is_bed_available: 0,
    is_lift_available: 0,
    furnished_type: "select",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  }

  let [data, setData] = useState(flat)

  let [tv, setTv] = useState(false);
  let [wifi, setWifi] = useState(false);
  let [lift, setLift] = useState(false);
  let [bed, setBed] = useState(false);
  let [parking, setParking] = useState(false);


  let onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    data = { ...data, [name]: value }
    setData(data);
    // console.table(name,value);
  }


  const isCheckWifi = () => {
    setWifi(!wifi);
  }

  const isCheckLift = () => {
    setLift(!lift);
  }

  const isCheckTv = () => {
    setTv(!tv);
  }

  const isCheckBed = () => {
    setBed(!bed);
  }

  const isCheckParking = () => {
    setParking(!parking);
  }



  const submit = (e) => {
    e.preventDefault();
    data["is_lift_available"] = parseInt(lift ? 1 : 0)
    data["is_wifi_available"] = parseInt(wifi ? 1 : 0)
    data["is_bed_available"] = parseInt(bed ? 1 : 0)
    data["is_tv_available"] = parseInt(tv ? 1 : 0)
    data["is_parking_available"] = parseInt(parking ? 1 : 0)

    data["rent"] = parseInt(data["rent"])
    data["no_of_members"] = parseInt(data["no_of_members"])
    data["deposite"] = parseInt(data["deposite"])
    console.log("DATA OBJECT")
    console.log(data);

    flatservice.insertFlat(data).then((res) => {
      console.log(res);
    });
    setData(flat);
    alert("Add Successfully")
    window.location.replace("http://localhost:3000/flat/list")

  }


  return (
    <div className="container-fluid mt-3  col-8 border border-black bg-white">
      <div className="row">
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Flat Type
          </label>
          <select className="form-select mt-2"
            name="flat_type" id="flat_type" value={data.flat_type} onChange={onChange} >
            <option value="select" selected disabled>
              Select
            </option>
            <option value="1 Room">1 Room</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
          </select>
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            requirement
          </label>
          <select className="form-select mt-2"
            name="requirement" id="requirement" value={data.requirement} onChange={onChange} >
            <option value="select" selected disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            No of Members
          </label>
          <select className="form-select mt-2"
            name="no_of_members" id="no_of_members" value={data.no_of_members} onChange={onChange} >
            <option value="select" selected disabled>
              Select
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Deposite
          </label>
          <input
            type="number"
            name="deposite"
            onChange={onChange}
            id="deposite"
            className="form-control mt-2 "
            value={data.deposite}
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Rent
          </label>
          <input
            type="number"
            name="rent"
            onChange={onChange}
            id="rent"
            className="form-control mt-2 "
            value={data.rent}
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="">
          <label for="" className="form-labe  fw-bold">
            Amenities
          </label>
        </div>
        <div className="row mt-2 ">
          <div className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_canteen_available"
                onChange={isCheckParking}
                value="1"
                id=""
                checked={parking}
              />
              <label className="form-check-label fw-bold " for="">
                Parking
              </label>
            </div>
          </div>
          <div className="col-1 ms-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_washing_machine_available"
                onChange={isCheckBed}
                value="1"
                id="is_washing_machine_available"
                checked={bed}
              />
              <label className="form-check-label fw-bold" for="">
                Bed
              </label>
            </div>
          </div>
          <div className="col-1 ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_tv_available"
                onChange={isCheckTv}
                value="1"
                id="is_tv_available"
                checked={tv}
              />
              <label className="form-check-label fw-bold" for="">
                TV
              </label>
            </div>
          </div>
          <div className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_wifi_available"
                onChange={isCheckWifi}
                value="1"
                id="is_wifi_available"
                checked={wifi}
              />
              <label className="form-check-label fw-bold" for="">
                WIFI
              </label>
            </div>
          </div>
          <div className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_lift_available"
                onChange={isCheckLift}
                value="1"
                id="is_lift_available"
                checked={lift}
              />
              <label className="form-check-label fw-bold" for="">
                LIFT
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe fw-bold">
              Furnished Type
            </label>
            <select className="form-select mt-2"
              name="furnished_type" id="furnished_type" value={data.furnished_type} onChange={onChange}>
              <option value="select" selected disabled>
                Select
              </option>
              <option value="none">None</option>
              <option value="Semi-furnished">Semi Furnish</option>
              <option value="Full-furnished">Full Furnish</option>
            </select>
          </div>
        </div>
        <div>
          <label for="" className="form-labe  fw-bold">
            Require Documents
          </label>
        </div>
        <div className="mt-3"></div>
        <hr className="text-info" />
        <div className="mt-2">
          <label for="" className="form-labe  fw-bold">
            Address
          </label>
          <textarea
            type="text"
            name="address"
            onChange={onChange}
            id="address"
            pattern="[A-Za-z]+"
            className="form-control mt-3"
            placeholder=""
            aria-describedby="helpId"
            rows={3}
            value={data.address}
            required
          />
        </div>
        <div className="row">
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe  fw-bold">
              City
            </label>
            <input
              type="text"
              pattern="[A-Za-z]+"
              className="form-control mt-2"
              name="city"
              onChange={onChange}
              id="city"
              placeholder=""
              aria-describedby="helpId"
              value={data.city}
              required
            />
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe  fw-bold">
              State
            </label>
            <input
              type="text"
              pattern="[A-Za-z]+"
              className="form-control mt-2"
              name="state"
              onChange={onChange}
              id="state"
              placeholder=""
              aria-describedby="helpId"
              value={data.state}
              required
            />
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe  fw-bold">
              Zipcode
            </label>
            <input
              type="number"
              pattern="[A-Za-z]+"
              name="zipcode"
              onChange={onChange}
              id="zipcode"
              className="form-control mt-2"
              placeholder=""
              aria-describedby="helpId"
              value={data.zipcode}
              required
            />
          </div>
        </div>
        <div>
          <label for="" className="form-labe  fw-bold mt-4">
            Image Upload
          </label>
        </div>
        <div className="mt-3">
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              accept="image/png, image/jpg, image/jpeg"
            />
            <label className="input-group-text" for="inputGroupFile02">
              Upload
            </label>
          </div>
        </div>
        <div>
          <input type="submit" className="btn btn-success col-12 mt-3 fw-bold" onClick={submit} value="Add" />
        </div>
      </div>
    </div>
  );
}

export default Flat;
