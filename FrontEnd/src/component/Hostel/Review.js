import { Rating } from "@mui/material";
import React, { useState } from "react";
import hostelservice from "../../serivces/HostelService"



function Review(props) {
  let hid=props.hid;
  let uid=props.uid;

  let [data,setData]=useState({
    review:"",
    ratings:0.0
  });

  const onChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData({...data,[name]:value});
  }


 
  const submit=(e)=>{
    e.preventDefault();
    
    data["user_id"]=uid
    data["hostel_id"]=parseInt(hid)
    data["ratings"]=parseFloat(data.ratings);
    setData(data);
   
     hostelservice.insertReview(data).then((result)=>{
       console.log(result);
     })
    setData({
      review:"",
      ratings:0.0
    })
    alert("Insert Successfully");
    window.location.reload();
  }
  return (
    <div>
    <form onSubmit={submit}>
      <div className="mt-2">
        <label for="" className="form-labe  fw-bold">
          Review
        </label>
        <textarea
          type="text"
          name="review"
          pattern="[A-Za-z]+"
          className="form-control mt-3"
          placeholder=""
          onChange={onChange}
          value={data.review}
          aria-describedby="helpId"
          rows={2}
          required
        />
      </div>
      <div className="mt-3">
        <label for="" className="form-labe  fw-bold">
          Ratings
        </label>
        <div>
          <Rating name="ratings"
          id="ratings"
          onChange={onChange}
          value={data.ratings}
          precision={0.5} />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-success col-2  mt-3"
         >Add</button>
      </div>
      </form>
    </div>
  );
}

export default Review;
