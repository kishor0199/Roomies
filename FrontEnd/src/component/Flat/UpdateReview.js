import { Rating } from "@mui/material";
import React, { useState } from "react";
import flatservice from "../../serivces/FlatService";
import { MdDelete,MdEdit } from "react-icons/md"

function UpdateReview(props) {
  let fid = props.fid;
  let uid = props.userid;

  let [data, setData] = useState({
    review: "",
    ratings: 0.0,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const deleteReview=(e)=>{
    let data={
      user_id:uid,
      flat_id:parseInt(fid)
    }
    
    alert("Delete successfully")
   flatservice.deleteReview(data).then((result)=>{
     console.log(result);
    });
    window.location.reload()
}

  const submit = (e) => {
    e.preventDefault();

    data["user_id"] = uid;
    data["flat_id"] = parseInt(fid);
    data["ratings"] = parseFloat(data.ratings);
    setData(data);
    console.log(data);
    flatservice.updateReview(data).then((result) => {
      console.log(result);
    });
    setData({
      review: "",
      ratings: 0.0,
    });
    alert("Update Successfully");
    window.location.reload();
  };

  return (
    <div className="card mt-3 border border-black">
      <h5 className="card-header mt-2">
        {props.review.namefirst + " " + props.review.namelast}(You)
      </h5>
      <div className="card-body">
        <h5 className="card-title row">
          <h2 className="col-1 pe-0">{parseInt(props.review.ratings).toFixed(1)}</h2>
          <Rating
            className="col-2 ms-1"
            precision={0.5}
            value={props.review.ratings}
            readOnly
          />
        </h5>
        <p className="card-text">
          <div className="d-flex justify-content-between">
            {props.review.review}
            <div className="d-flex flex-row-reverse bd-highlight">
              <div className="p-2 bd-highlight">
                <a href="#" className="text-danger" onClick={deleteReview}><MdDelete size={20}/></a>
              </div>
              <div className="p-2 bd-highlight">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <MdEdit size={20}/>
                </a>
              </div>
            </div>
          </div>
        </p>
        <div
          className="modal"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Review
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form method="post" onSubmit={submit}>
                  <label for="" className="form-labe  fw-bold">
                    Review
                  </label>
                  <textarea
                    type="text"
                    value={data.review}
                    name="review"
                    onChange={onChange}
                    className="form-control mt-3"
                    placeholder=""
                    aria-describedby="helpId"
                    rows={2}
                    required
                  />
                  <div className="mt-3">
                    <label for="" className="form-labe  fw-bold">
                      Ratings
                    </label>
                    <div>
                      <Rating
                        name="ratings"
                        onChange={onChange}
                        value={data.ratings}
                        id="ratings"
                        precision={0.5}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      Change
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateReview;
