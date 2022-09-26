import React, { useState } from "react";
import hostelservice from "../../serivces/HostelService";
import FileUpload from "./fileupload";
import axios from "axios";
function Hostel({user}) {

    let id=user.id;

    const hostel={
        owner_id:id,
        name:"",
        total_rooms:"",
        available_rooms:"",
        requirement:"select",
        no_of_singlebed:0,
        no_of_doublebed:0,
        is_canteen_available:0,
        is_wifi_available:0,
        is_tv_available:0,
        is_lift_available:0,
        is_washing_machine_available:0,
        is_ac_available:0,
        room_fee:"",
        canteen_fee:"",
        address:"",
        city:"",
        state:"",
        zipcode:"",
        image:""
    }

    let[data,setData]=useState(hostel)

    const [newUserInfo, setNewUserInfo] = useState({profileImages: []});

    const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });


    let [canteen,setCanteen]=useState(false);
    let [tv,setTv]=useState(false);
    let [wifi,setWifi]=useState(false);
    let [lift,setLift]=useState(false);
    let [wm,setWm]=useState(false);
    let [ac,setAc]=useState(false);


  const isCheckCanteen=()=>{
      setCanteen(!canteen);
  }

  const isCheckWifi=()=>{
      setWifi(!wifi);
  }
  const isCheckAc=()=>{
      setAc(!ac);
  }
  const isCheckLift=()=>{
      setLift(!lift);
  }
  const isCheckWm=()=>{
      setWm(!wm);
  }
  const isCheckTv=()=>{
      setTv(!tv);
  }

    let onChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        data={...data,[name]:value}
        setData(data);
        console.table(name,value);
    }

    const submit=(e)=>{
        e.preventDefault();
        data["is_canteen_available"]=parseInt(canteen?1:0)
        data["is_wifi_available"]=parseInt(wifi?1:0)
        data["is_lift_available"]=parseInt(lift?1:0)
        data["is_washing_machine_available"]=parseInt(wm?1:0)
        data["is_tv_available"]=parseInt(tv?1:0)
        data["is_ac_available"]=parseInt(ac?1:0)
        data["tota_rooms"]=parseInt(data["total_rooms"])
        data["available_rooms"]=parseInt(data["available_rooms"])
        data["canteen_fee"]=parseInt(data["canteen_fee"])
        data["room_fee"]=parseInt(data["room_fee"])
        data["no_of_singlebed"]=parseInt(data["no_of_singlebed"])
        data["no_of_doublebed"]=parseInt(data["no_of_doublebed"])
        const {profileImages} = newUserInfo;
        console.log(profileImages);

        const formData = new FormData();

        formData.append('data',data);
        for(let i = 0; i < profileImages.length; i++){
          console.log(profileImages[i]);
          formData.append('image',profileImages[i]);
        }

         hostelservice.insertHostelImg(formData).then((res)=>{
             console.log(res);
         });

        alert("Add Successfully")
        //setData(hostel);
        // window.location.replace(`http://localhost:3000/hostel/list/${user.id}`)

    }
    // const {profileImages} = newUserInfo;
    // const image = profileImages;
    // console.log(image);

  return (
    <div className="container-fluid mt-3  col-8 border border-black bg-white">
      <div className="mt-4">
      <h1>New Form</h1>
        <label for="" className="form-labe  fw-bold">
          Hostel Name
        </label>
        <input
          type="text"
          name="name"
          onChange={onChange}
          value={data.name}
          id="name"
          pattern="[A-Za-z]+"
          className="form-control mt-2"
          placeholder=""
          aria-describedby="helpId"
          required
        />
      </div>
      <div className="row">
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Total rooms
          </label>
          <input
            type="number"
            name="total_rooms"
            onChange={onChange}
            id="total_rooms"
            value={data.total_rooms}
            pattern="[A-Za-z]+"
            className="form-control mt-2"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Available rooms
          </label>
          <input
            type="number"
            name="available_rooms"
            onChange={onChange}
            id="available_rooms"
            value={data.available_rooms}
            pattern="[A-Za-z]+"
            className="form-control mt-2"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
           No of Single Bed
          </label>
          <input
            type="number"
            name="no_of_singlebed"
            onChange={onChange}
            id="no_of_singlebed"
            value={data.no_of_singlebed}
            pattern="[A-Za-z]+"
            className="form-control mt-2"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            No of Double Bed
          </label>
          <input
            type="number"
            name="no_of_doublebed"
            onChange={onChange}
            id="no_of_doublebed"
            value={data.no_of_doublebed}
            pattern="[A-Za-z]+"
            className="form-control mt-2"
            placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <div className="mb-3 mt-4 col-3">
          <label for="" className="form-labe  fw-bold">
            Requirement
          </label>
          <select className="form-select mt-2"
            name="requirement" id="requirement" value={data.requirement} onChange={onChange} >
            <option  value="select" selected disabled>
              Select
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="">
          <label for="" className="form-labe  fw-bold">
            Amenities
          </label>
        </div>
        <div className="row mt-2">
          <div className="col-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_canteen_available"
                onChange={isCheckCanteen}
                value="1"
                id="is_canteen_available"
                checked={canteen}
              />
              <label className="form-check-label fw-bold" for="">
                Canteen
              </label>
            </div>
          </div>
          <div className="col-3 ms-4 ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_washing_machine_available"
                onChange={isCheckWm}
                value="1"
                id="is_washing_machine_available"
                checked={wm}
              />
              <label className="form-check-label fw-bold" for="">
                Washing Machine
              </label>
            </div>
          </div>
          <div className="col-1 ms-4">
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
          <div className="col-1 ms-5">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="is_ac_available"
                onChange={isCheckAc}
                id="is_ac_available"
                value="1"
                checked={ac}
              />
              <label className="form-check-label fw-bold" for="">
                AC
              </label>
            </div>
          </div>
          <div className="col-1 ms-5">
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
          <div className="col-1 ms-5">
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
            <label for="" className="form-labe  fw-bold">
              Room fee
            </label>
            <input
              type="number"
              pattern="[A-Za-z]+"
              className="form-control mt-2"
              name="room_fee"
              onChange={onChange}
              id="room_fee"
              placeholder="/month"
              value={data.room_fee}
              aria-describedby="helpId"
              required
            />
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe  fw-bold">
              Canteen fee
            </label>
            <input
              type="number"
              pattern="[A-Za-z]+"
              name="canteen_fee"
              onChange={onChange}
              id="canteen_fee"
              className="form-control mt-2"
              placeholder="/month"
              value={data.canteen_fee}
              aria-describedby="helpId"
              disabled={!canteen}
              required
            />
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
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
          name="profileImage"
        />
        <div>
            {/* <input type="file"  name="image" multiple  ></input> */}
            <input type="submit" className="btn btn-success col-12 mt-3 fw-bold" onChange={onChange} onClick={submit} value="Add"/>
        </div>
        
      </div>
    </div>
  );
}

export default Hostel;
