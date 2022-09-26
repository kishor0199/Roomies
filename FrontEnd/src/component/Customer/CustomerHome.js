import { FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";

import "../../css/image.css"

function CustomerHome() {

  const [state, setState] = useState('/hostel');
  const [, render] = useState();

  const HandleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setState(value === "/hostel" ? "/flat" : "/hostel");
    render(Math.random(0.5))
  }
  console.log(state);
  return (
    <div className="container-fluid col-9 mt-4">

      <div class="form-check form-switch">
        <label class="form-check-label text-light fw-bold" for="flexSwitchCheckDefault">{state.substring(1, state.length).toUpperCase()}</label>

        <input
          type="checkbox"
          name="is_canteen_available"
          onChange={HandleChange}
          className="form-check-input p-2 "
          value={state}
          id="imagechange"
          role="switch"
        ></input></div>
      <label className="form-la"></label>
      <div className="row ms-5">
        <a href={`${state}/list/city/nashik`} className="col-3 ms-5 mt-3 ">
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/nashik.jpg")}
          ></img>
        </a>
        <a href={`${state}/list/city/pune`} className="col-3 ms-5 mt-3 ">
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/pune.jpg")}
          ></img>
        </a>
        <a href={`${state}/list/city/mumbai`} className="col-3 ms-5 mt-3 ">
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/mumbai.jpg")}
          ></img>
        </a>
      </div>
      <div className="row ms-5">
        <a href={`${state}/list/city/satara`} className="col-3 ms-5 mt-3 ">
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/satara.jpg")}
          ></img>
        </a>
        <a href={`${state}/list/city/kolhapur`} className="col-3 ms-5 mt-3 " >
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/kolhapur.jpg")}
          ></img>
        </a >
        <a href={`${state}/list/city/sangli`} className="col-3 ms-5 mt-3 " >
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/sangli.jpg")}
          ></img>
        </a >
      </div >
      <div className="row ms-5">
        <a href={`${state}/list/city/nagpur`} className="col-3 ms-5 mt-3 ">
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/nagpur.jpg")}
          ></img>
        </a>
        <a href={`${state}/list/city/thane`} className="col-3 ms-5 mt-3 " >
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/thane.jpg")}
          ></img>
        </a >
        <a href={`${state}/list/city/navimumbai`} className="col-3 ms-5 mt-3 " >
          <img
            className="img-thumbnail bg-transparent shadow-lg p-3 mb-5 bg-white rounded imghover"
            src={require("../../images/navimumbai.jpg")}
          ></img>
        </a >
      </div >
    </div >
  );
}

export default CustomerHome;
