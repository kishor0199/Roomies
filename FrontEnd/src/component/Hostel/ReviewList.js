import { Rating } from "@mui/material";
import React from "react";
 
function ReviewList(props) {
  return (
    <div className="card mt-3 border border-black">
    <h5 className="card-header mt-2">{props.review.namefirst+" "+props.review.namelast}</h5>
    <div className="card-body">
      <h5 className="card-title row">
        <h2 className="col-1 pe-0">{props.review.ratings}</h2>
        <Rating className="col-2 ms-1" precision={0.5} value={parseInt(props.review.ratings).toFixed(1)} readOnly />
      </h5>
      <p className="card-text">
        {props.review.review}
      </p>
    </div>
  </div>
  );
}

export default ReviewList;
