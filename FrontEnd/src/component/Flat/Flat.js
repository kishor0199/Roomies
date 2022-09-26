import React, { useState } from "react";
import flatservice from "../../serivces/FlatService";
import FileUpload from "./fileupload";
import { useFormik } from "formik";
import * as Yup from 'yup';


const FlatSchema = Yup.object({

  owner_id: Yup.number().required(),
  flat_type: Yup.string().oneOf(['1 Room','1BHK','2BHK',"3BHK","4BHK"]),
  requirement: Yup.string().oneOf(['male','female']),
  no_of_members: Yup.string().oneOf(['1','2','3','4','5','6','7','8','9']),
  furnished_type: Yup.string().oneOf(['none','Semi-furnished','Full-furnished']),
  deposite : Yup.number().required(),
  rent : Yup.number().required(),
  address: Yup.string().required("This is Required Field !"),
  city: Yup.string().required("This is Required Field !"),
  state: Yup.string().required("This is Required Field !"),
  zipcode: Yup.number().required(),
})



function Flat({ user }) {
  const [newUserInfo, setNewUserInfo] = useState({ profileImages: [] });
  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const initialValues = {
    owner_id: user.id,
    flat_type: "select",
    requirement: "select",
    no_of_members: "select",
    deposite: "",
    rent: "",
    is_wifi_available: false,
    is_tv_available: false,
    is_parking_available: false,
    is_bed_available: false,
    is_lift_available: false,
    is_adhaar: 0,
    is_pan: 0,
    is_photo: 0,
    furnished_type: "select",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };

  let [adhaar, setAdhaar] = useState();
  let [photo, setPhoto] = useState();
  let [pan, setPan] = useState();

  const isCheckAdhaar = () => {
    setAdhaar(!adhaar);
  };

  const isCheckPan = () => {
    setPan(!pan);
  };

  const isCheckPhoto = () => {
    setPhoto(!photo);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema:FlatSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (adhaar) values["is_adhaar"] = 1;
        else values["is_adhaar"] = 0;

        if (photo) values["is_photo"] = 2;
        else values["is_photo"] = 0;

        if (pan) values["is_pan"] = 3;
        else values["is_pan"] = 0;

        let formData = new FormData();
        for (let value in values) {
          if (values[value] == true) {
            formData.append(value, 1);
          } else if (values[value] == false) {
            formData.append(value, 0);
          } else formData.append(value, values[value]);
        }
        const { profileImages } = newUserInfo;
        for (let i = 0; i < profileImages.length; i++) {
          console.log(profileImages[i]);
          formData.append("image", profileImages[i]);
        }

        for (let property of formData.entries()) {
          console.log(property[0], property[1]);
        }

        flatservice.insertFlat(formData).then((res) => {
          console.log(res);
        });
        
        alert("Add Successfully");

        if (user && user.role === 1) {
          window.location.replace(
            `http://localhost:3000/flat/list/${user.id}`
          );

        } else {
          window.location.replace(`http://localhost:3000/flat/list`);
        }

      } catch (error) {
        console.log(error);
      }
    },
  });

  // console.log(values)

  return (
    <div className="container-fluid mt-3  col-8 border border-black bg-white">
      <h1>Add New Flat</h1>
      <div className="row">
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Flat Type
          </label>
          <select
            className="form-select mt-2"
            name="flat_type"
            id="flat_type"
            value={values.flat_type}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="select" selected disabled>
              Select
            </option>
            <option value="1 Room">1 Room</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
          </select>{errors.flat_type && touched.flat_type && <div class="form-text text-danger">{errors.flat_type}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            requirement
          </label>
          <select
            className="form-select mt-2"
            name="requirement"
            id="requirement"
            value={values.requirement}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="select" selected disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>{errors.requirement && touched.requirement && <div class="form-text text-danger">{errors.requirement}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            No of Members
          </label>
          <select
            className="form-select mt-2"
            name="no_of_members"
            id="no_of_members"
            value={values.no_of_members}
            onChange={handleChange}
            onBlur={handleBlur}
          >
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
          </select>{errors.no_of_members && touched.no_of_members && <div class="form-text text-danger">{errors.no_of_members}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Deposite
          </label>
          <input
            type="number"
            name="deposite"
            value={values.deposite}
            onChange={handleChange}
            onBlur={handleBlur}
            id="deposite"
            className="form-control mt-2 "
            aria-describedby="helpId"
            required
          />{errors.deposite && touched.deposite && <div class="form-text text-danger">{errors.deposite}</div>}
        </div>
        <div className="mb-3 mt-4 col-2">
          <label for="" className="form-labe  fw-bold">
            Rent
          </label>
          <input
            type="number"
            name="rent"
            id="rent"
            className="form-control mt-2 "
            value={values.rent}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-describedby="helpId"
            required
          />{errors.rent && touched.rent && <div class="form-text text-danger">{errors.rent}</div>}
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
                name="is_parking_available"
                onChange={handleChange}
                value={values.is_parking_available}
                checked={values.is_parking_available}
                id=""
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
                name="is_bed_available"
                onChange={handleChange}
                value={values.is_bed_available}
                checked={values.is_bed_available}
                id="is_bed_available"
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
                onChange={handleChange}
                value={values.is_tv_available}
                checked={values.is_tv_available}
                id="is_tv_available"
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
                onChange={handleChange}
                value={values.is_wifi_available}
                checked={values.is_wifi_available}
                id="is_wifi_available"
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
                onChange={handleChange}
                value={values.is_lift_available}
                checked={values.is_lift_available}
                id="is_lift_available"
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
            <select
              className="form-select mt-2"
              name="furnished_type"
              id="furnished_type"
              value={values.furnished_type}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="select" selected disabled>
                Select
              </option>
              <option value="none">None</option>
              <option value="Semi-furnished">Semi Furnish</option>
              <option value="Full-furnished">Full Furnish</option>
            </select>{errors.furnished_type && touched.furnished_type && <div class="form-text text-danger">{errors.furnished_type}</div>}
          </div>
        </div>
        <div className='row'>
          <label for="" className="form-labe  fw-bold mb-3">
           Require Documents
          </label>
          <div className="col-2 ms-1 ">
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
              <label className="form-check-label fw-bold" for="">
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
              <label className="form-check-label fw-bold" for="">
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
              <label className="form-check-label fw-bold" for="">
                PAN Card
              </label>
            </div>
          </div>
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
            id="address"
            pattern="[A-Za-z]+"
            className="form-control mt-3"
            placeholder=""
            aria-describedby="helpId"
            rows={3}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />{errors.address && touched.address && <div class="form-text text-danger">{errors.address}</div>}
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
              id="city"
              placeholder=""
              aria-describedby="helpId"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />{errors.city && touched.city && <div class="form-text text-danger">{errors.city}</div>}
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
              id="state"
              placeholder=""
              aria-describedby="helpId"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />{errors.state && touched.state && <div class="form-text text-danger">{errors.state}</div>}
          </div>
          <div className="mb-3 mt-4 col-2">
            <label for="" className="form-labe  fw-bold">
              Zipcode
            </label>
            <input
              type="number"
              pattern="[A-Za-z]+"
              name="zipcode"
              id="zipcode"
              className="form-control mt-2"
              placeholder=""
              aria-describedby="helpId"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />{errors.zipcode && touched.zipcode && <div class="form-text text-danger">{errors.zipcode}</div>}
          </div>
        </div>
        <div>
          <label for="" className="form-labe  fw-bold mt-4">
            Image Upload
          </label>
        </div>
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Flat Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
          name="image"
        />
        <div>
          <input
            type="submit"
            className="btn btn-success col-12 mt-3 fw-bold"
            onClick={handleSubmit}
            value="Add"
          />
        </div>
      </div>
    </div>
  );
}

export default Flat;
