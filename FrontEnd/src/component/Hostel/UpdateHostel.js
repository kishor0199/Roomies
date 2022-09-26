import React, { useState, useEffect } from "react";
import hostelservice from "../../serivces/HostelService";
import FileUpload from "./fileupload";
import { useParams } from "react-router-dom";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';

const HostelSchema = Yup.object({

  owner_id: Yup.number().required(),
  name: Yup.string().required("This is Required Field !"),
  total_rooms: Yup.number().required("This is Required Field !"),
  available_rooms: Yup.number().required("This is Required Field !"),
  requirement: Yup.string().oneOf(['male','female']),
  no_of_singlebed: Yup.number().required("This is Required Field !"),
  no_of_doublebed: Yup.number().required("This is Required Field !"),
  is_canteen_available: Yup.bool("This is Required Field !"),
  room_fee: Yup.number().required("This is Required Field !"),
  canteen_fee: Yup.number().when('is_canteen_available', {
    is: true,
    then: Yup.number().required("This is Required Field !"),
    otherwise: null
  }),
  address: Yup.string().required("This is Required Field !"),
  city: Yup.string().required("This is Required Field !"),
  state: Yup.string().required("This is Required Field !"),
  zipcode: Yup.number().required(),

})


function Hostel({ user }) {
  let id = useParams().id;
  let data;
  let initialValues = {
    owner_id: id,
    name: "",
    total_rooms: "",
    available_rooms: "",
    requirement: "select",
    no_of_singlebed: "",
    no_of_doublebed: "",
    is_canteen_available: false,
    is_wifi_available: false,
    is_tv_available: false,
    is_lift_available: false,
    is_washing_machine_available: false,
    is_ac_available: false,
    is_adhaar:0,
    is_pan:0,
    is_photo:0,
    room_fee: "",
    canteen_fee: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    imagechange: false,
    image1: "",
    image2: "",
    image3: "",
    hostel_id: "",
  }
  const [isLoading, setIsLoading] = useState(true);
  const [, rerenderer] = useState();

  let[documents,setDocument]=useState([])

  let [adhaar,setAdhaar]=useState();
  let [photo,setPhoto]=useState();
  let [pan,setPan]=useState();


  useEffect(() => {
    getData(id);
    getDocuments(id);
  }, [])

  const isCheckAdhaar=()=>{
    setAdhaar(!adhaar)
  }

  const isCheckPan=()=>{
    setPan(!pan)
  }

  const isCheckPhoto=()=>{
    setPhoto(!photo);
  }

  const getData = (id) => {
    hostelservice.getHostelById(id).then((result) => {
      
      if (adhaar) values["is_adhaar"] = 1;
      else values["is_adhaar"] = 0;
  
      if (photo) values["is_photo"] = 2;
      else values["is_photo"] = 0;
  
      if (pan) values["is_pan"] = 3;
      else values["is_pan"] = 0;

      data = result.data[0];
      values.owner_id = data.owner_id;
      values.name = data.name;
      values.total_rooms = data.total_rooms;
      values.available_rooms = data.available_rooms;
      values.requirement = data.requirement;
      values.no_of_singlebed = data.no_of_singlebed;
      values.no_of_doublebed = data.no_of_doublebed;
      values.is_canteen_available = data.is_canteen_available ? true : false;
      values.is_wifi_available = data.is_wifi_available ? true : false;
      values.is_tv_available = data.is_tv_available ? true : false;
      values.is_lift_available = data.is_lift_available ? true : false;
      values.is_washing_machine_available = data.is_washing_machine_available ? true : false;
      values.is_ac_available = data.is_ac_available ? true : false;
      values.room_fee = data.room_fee;
      values.canteen_fee = data.canteen_fee;
      values.address = data.address;
      values.city = data.city;
      values.state = data.state;
      values.zipcode = data.zipcode;
      values.image1 = data.image1;
      values.image2 = data.image2;
      values.image3 = data.image3;
      values.hostel_id = data.hostel_id;
      setIsLoading(false);
      console.log(data);
    })
  }

  const getDocuments=(id)=>{
    hostelservice.getDocuments(id).then((result)=>{
      documents=result.data;
      setAdhaar(documents.some(element=>element.document_id===1));
      setPhoto(documents.some(element=>element.document_id===2));
      setPan(documents.some(element=>element.document_id===3));
      console.log(documents)
    })
  }

  const [newUserInfo, setNewUserInfo] = useState({ profileImages: [] });
  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema:HostelSchema,
    onSubmit: async (values) => {

      try {
        console.log(values);
        let formData = new FormData();
          
        if (adhaar) values["is_adhaar"] = 1;
        else values["is_adhaar"] = 0;
    
        if (photo) values["is_photo"] = 2;
        else values["is_photo"] = 0;
    
        if (pan) values["is_pan"] = 3;
        else values["is_pan"] = 0;

        for (let value in values) {
          if (values[value] === true) {
            formData.append(value, 1);
          } else if (values[value] === false) {
            formData.append(value, 0);
          } else
            formData.append(value, values[value]);
        }

        if (values.imagechange === true) {
          const { profileImages } = newUserInfo;
          for (let i = 0; i < profileImages.length; i++) {
            console.log(profileImages[i]);
            formData.append('image', profileImages[i]);
          }
        }

        for (let property of formData.entries()) {
          console.log(property[0], property[1]);
        }

        hostelservice.updateHostelImg(formData).then((res) => {
          console.log(res);
         
            hostelservice.updateDocument(values).then((result)=>{
                console.log(result);
            })

          alert("Updated  Successfully")
          if (user && user.role === 1) {
            window.location.replace(`http://localhost:3000/hostel/list/${user.id}`)
          } else {
            window.location.replace(`http://localhost:3000/hostel/list`)
          }
        });
        
       
      } catch (error) {
        console.log(error);
      }
    }
  });

  const HandleRender = (e) => {
    values.imagechange = values.imagechange ? false : true;
    rerenderer(Math.random(0.5));
  }
  console.log(values)

  return (
    <>{!isLoading &&
        <div className="container-fluid mt-3  col-8 border border-black bg-white">
      <div className="mt-4">
        <h1>Update Hostel</h1>
        <label for="" className="form-label ">
          Hostel Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
          value={values.name}
          id="name"
          required
        />{errors.name && touched.name && <div class="form-text text-danger">{errors.name}</div>}
      </div>
      <div className="row">
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-label ">
            Total rooms
          </label>
          <input
            type="number"
            name="total_rooms"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            id="total_rooms"
            value={values.total_rooms}
            required
          />{errors.total_rooms && touched.total_rooms && <div class="form-text text-danger">{errors.total_rooms}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-label ">
            Available rooms
          </label>
          <input
            type="number"
            name="available_rooms"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            id="available_rooms"
            value={values.available_rooms}
            required
          />{errors.available_rooms && touched.available_rooms && <div class="form-text text-danger">{errors.available_rooms}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-label ">
            No of Single Bed
          </label>
          <input
            type="number"
            name="no_of_singlebed"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            id="no_of_singlebed"
            value={values.no_of_singlebed}
            required
          />{errors.no_of_singlebed && touched.no_of_singlebed && <div class="form-text text-danger">{errors.no_of_singlebed}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-label ">
            No of Double Bed
          </label>
          <input
            type="number"
            name="no_of_doublebed"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            id="no_of_doublebed"
            value={values.no_of_doublebed}
            required
          />{errors.no_of_doublebed && touched.no_of_doublebed && <div class="form-text text-danger">{errors.no_of_doublebed}</div>}
        </div>
        <div className="mb-3 mt-3 col-3">
          <label for="" className="form-label ">
            Requirement
          </label>
          <select className="form-select mt-2"
            name="requirement" id="requirement" value={values.requirement} onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="select" disabled>Select</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>{errors.requirement && touched.requirement && <div class="form-text text-danger">{errors.requirement}</div>}
        </div>
        <div className="">
          <label for="" className="form-label ">
            Amenities
          </label>
        </div>
        <div className="row mt-2">
          <div className="col-2">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_canteen_available"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-check-input"
                value={values.is_canteen_available}
                id="is_canteen_available"
                checked={values.is_canteen_available}
              />
              <label className="form-check-label" for="">
                Canteen
              </label>
            </div>
          </div>
          <div className="col-3 ms-4 ">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_washing_machine_available"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-check-input"
                value={values.is_washing_machine_available}
                id="is_washing_machine_available"
                checked={values.is_washing_machine_available}
              />
              <label className="form-check-label" for="">
                Washing Machine
              </label>
            </div>
          </div>
          <div className="col-1 ms-4">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_tv_available"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-check-input"
                value={values.is_tv_available}
                id="is_tv_available"
                checked={values.is_tv_available}
              />
              <label className="form-check-label" for="">
                TV
              </label>
            </div>
          </div>
          <div className="col-1 ms-5">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_ac_available"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-check-input"
                id="is_ac_available"
                value={values.is_ac_available}
                checked={values.is_ac_available}
              />
              <label className="form-check-label" for="">
                AC
              </label>
            </div>
          </div>
          <div className="col-1 ms-5">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_wifi_available"
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-check-input"
                value={values.is_wifi_available}
                checked={values.is_wifi_available}
                id="is_wifi_available"
              />
              <label className="form-check-label" for="">
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.is_lift_available}
                id="is_lift_available"
                checked={values.is_lift_available}
              />
              <label className="form-check-label" for="">
                LIFT
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-label ">
              Room fee
            </label>
            <input
              type="number"
              name="room_fee"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="room_fee"
              placeholder="/month"
              value={values.room_fee}
              required
            />{errors.room_fee && touched.room_fee && <div class="form-text text-danger">{errors.room_fee}</div>}
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-label ">
              Canteen fee
            </label>
            <input
              type="number"
              name="canteen_fee"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="canteen_fee"
              placeholder="/month"
              value={values.canteen_fee}
              aria-describedby="helpId"
              disabled={!values.is_canteen_available}
              required
            />{errors.canteen_fee && touched.canteen_fee && <div class="form-text text-danger">{errors.canteen_fee}</div>}
          </div>
        </div>
        <div className="row">
          <label for="" className="form-labe  mb-3 ">
            Require Documents
          </label>
          <div className="col-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="Adhaar card"
                onChange={isCheckAdhaar}
                value="1"
                id="Adhaar card"
                checked={adhaar}
              />
              <label className="form-check-label " for="">
                Adhaar Card
              </label>
            </div>
          </div>
          <div className="col-1 ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="Photo"
                onChange={isCheckPhoto}
                id="Photo"
                value="2"
                checked={photo}
              />
              <label className="form-check-label " for="">
                Photo
              </label>
            </div>
          </div>
          <div className="col-3 ms-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="PAN Card"
                onChange={isCheckPan}
                value="3"
                id="PAN Card"
                checked={pan}
              />
              <label className="form-check-label" for="">
                PAN Card
              </label>
            </div>
          </div>
        </div>
        <div className="mt-3"></div>
        <hr className="text-info" />
        <div className="mt-2">
          <label for="" className="form-label ">
            Address
          </label>
          <textarea
            type="text"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            id="address"
            placeholder="Address In 250 Characters"
            aria-describedby="helpId"
            rows={3}
            value={values.address}
            required
          />{errors.address && touched.address && <div class="form-text text-danger">{errors.address}</div>}
        </div>
        <div className="row">
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-label ">
              City
            </label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="city"
              placeholder=""
              aria-describedby="helpId"
              value={values.city}
              required
            />{errors.city && touched.city && <div class="form-text text-danger">{errors.city}</div>}
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-label ">
              State
            </label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="state"
              placeholder=""
              aria-describedby="helpId"
              value={values.state}
              required
            />{errors.state && touched.state && <div class="form-text text-danger">{errors.state}</div>}
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-label ">
              Zipcode
            </label>
            <input
              type="number"
              name="zipcode"
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
              id="zipcode"
              value={values.zipcode}
              required
            />{errors.total_rooms && touched.total_rooms && <div class="form-text text-danger">{errors.total_rooms}</div>}
          </div>
        </div>
        <div>

            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">Update Images</label>

              <input
                type="checkbox"
                name="is_canteen_available"
                onChange={HandleRender}
                className="form-check-input p-2 "
                value={values.imagechange}
                id="imagechange"
                role="switch"
              ></input>
            </div>

            <label for="" className="form-label  mt-4">
              Please Note All Previous Images Will Be Replaced!
            </label>

            <FileUpload
              accept=".jpg,.png,.jpeg"
              label="Profile Image(s)"
              multiple
              updateFilesCb={updateUploadedFiles}
              name="image"
            />
            }
          </div>
          <div>
            <input type="submit" className="btn btn-success col-12 mt-3"
              onClick={handleSubmit} value="Update" />
          </div>
        </div>
      </div>}
    </>
  );
}

export default Hostel;
