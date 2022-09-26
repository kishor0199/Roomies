import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import flatservice from "../../serivces/FlatService";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "../Icon";
import UpdateReview from "./UpdateReview";
import ReviewList from "./ReviewList";
import MessageBox from "./MessageBox";
import Review from "./Review";
import { MdAdd } from "react-icons/md";


function FlatDetails({ user }) {
  let id = useParams().id;
  let [flat, setFlat] = useState([]);

  let [reviews, setReviews] = useState([]);

  let [documents, setDocuments] = useState([]);

  useEffect(() => {
    getData(id);
    getAllReviews(id);
    getAllDocuments(id);
  }, []);

  const getData = (id) => {
    flatservice.getFlatById(id).then((result) => {
      flat = result.data[0];
      setFlat(flat);
      console.log(flat);
    });
  };

  const getAllReviews = (id) => {
    flatservice.getReviews(id).then((result) => {
      reviews = result.data;
      console.log(reviews);
      setReviews(reviews);
    });
  };

  const getAllDocuments = (id) => {
    flatservice.getDocuments(id).then((result) => {
      documents = result.data;
      setDocuments(documents);
      console.log(documents);
    });
  };

 
  return (
    <div className="container-fluid  col-9 bg-light">
      <div className="row">
        <div className="col-3">
          <div className="mt-3 wt-25">
            <img
              className="img-thumbnail"
              src={require("../../images/hall.jpg")}
            ></img>
          </div>
          <div className="text-center">
            <h3>
              <span>{flat.namefirst}</span>
              <span>{" " + flat.namelast}</span>
            </h3>
          </div>
          <div className="text-center mt-3 list-inline">
            <button
              className="btn btn-dark fw-bold list-inline-item fs-5 "
              data-bs-toggle="collapse"
              data-bs-target="#chat"
            >
              message
              <span className="ms-3 text-center list-inline-item">
                <img src={require("../../images/chat.png")} width={25} />
              </span>
            </button>
          </div>
          <div
            className=" collapse border border-black mt-4 bottomright"
            id="chat"
          >
            <MessageBox  uname = {user.name}oname={flat.namefirst + " " + flat.namelast} />
          </div>


        </div>
        <div className="col-9 mt-4 border border-dark">
          <h3 className="mt-4">{flat.name}</h3>
          <div className="row col-9">
            <div className="col-3 ">
              <span className="fw-bold">Looking for {flat.requirement}</span>
              <br />
              <span className="fw-bold">Total Members-{flat.no_of_members}</span>

            </div>
            <div className="col-1">
              <Rating precision={0.5} value={2.5} readOnly />
            </div>
          </div>
          <div className="row col-6 mt-2">
            <div className="col-1">
              <img src={require("../../images/location.png")} width="20" />
            </div>
            <div className="col-1 text-left">
              <h5 className="text-secondary">{flat.city}</h5>
            </div>
          </div>
          <hr className="bg-dark" />
          <h3>Info</h3>
          <div className="row text-left mt-3">
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Type</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Furnish Type</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Deposite</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Rent</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3 text-center">
              <h5 className="text-success ">{flat.flat_type}</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-success ">{flat.furnished_type}</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-success ">{flat.deposite}</h5>
            </div>
            <div className="col-3 text-center ">
              <h5 className="text-success">{flat.rent}</h5>
            </div>
          </div>
          <hr className="bg-dark" />
          <h3>Pictures</h3>
          <Carousel
            autoPlay
            width={800}
            interval={5000}
            infiniteLoop
            dynamicHeight={true}
            showIndicators={true}
            showArrows={true}
          >
            <div>
              {flat && flat.image1 === "null" &&
                <img src={require("../../images/kitchen.jpg")}></img>}
              {flat && flat.image1 &&
                <img src={`http://localhost:8080/` + flat.image1} ></img>}
            </div>

            <div>
              {flat && flat.image2 === "null" &&
                <img src={require("../../images/bedroom.jpg")}></img>}
              {flat && flat.image2 &&
                <img src={`http://localhost:8080/` + flat.image2} ></img>}
            </div>

            <div>
              {flat && flat.image3 === "null" &&
                <img src={require("../../images/hall.jpg")}></img>}
              {flat && flat.image3 &&
                <img src={`http://localhost:8080/` + flat.image3} ></img>}
            </div>
          </Carousel>
          <hr className="bg-dark" />
          <h3>Amenities</h3>
          <div className="mt-3">
            <Icon show={flat.is_parking_available} iname="parking" />
            <Icon show={flat.is_bed_available} iname="bed" />
            <Icon show={flat.is_wifi_available} iname="wifi" />
            <Icon show={flat.is_lift_available} iname="lift" />
            <Icon show={flat.is_tv_available} iname="tv" />
          </div>
          <hr className="bg-dark" />
          <h3>Address</h3>
          <div className=" border border-info">
            <p className="ms-2 fw-bold">{flat.address}{"  " + flat.zipcode}</p>
          </div>
          <hr className="bg-dark" />
          <h3>Description</h3>
          <div className="border border-info">
            <p className="ms-2 fw-bold">
              <ui className="list-inline">
                <li className="list-inline-item text-danger">Required documents:</li>
                {documents.map((element) => {
                  return (
                    <>
                      <li className="list-inline-item text-danger">
                        {element.name + ","}
                      </li>
                    </>
                  );
                })}
              </ui>
              <br />
            </p>
          </div>
          <hr className="bg-dark" />
          <h3>Reviews</h3>

          <div>
            <button
              className="btn btn-primary col-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#reviews"
              aria-expanded="false"
              aria-controls="reviews"
              disabled={reviews.length === 0}
            >
              {reviews.length === 0 ? "No Reviews" : "All Reviews"}
            </button>{user && user.role === 2 && <>
              <button
                className="btn ms-4 rounded-circle btn-success"
                data-bs-toggle="collapse"
                data-bs-target="#addreview"
                aria-expanded="false"
                id="addbtn"
                aria-controls="reviews"
                disabled={reviews.some(element => element.user_id === user.id)}

              >

                {/* <i className="bi-plus-circle" style={{"font-size": "32px"}} ></i> */}
                <MdAdd size={32} />
              </button></>}
          </div>

          <div className="collapse mt-3 border border-black" id="addreview">
            <Review userid={user.id} fid={id} />
          </div>
          <div className="collapse mt-3" id="reviews">
            <div className="row">
              {
                reviews.map((element) => {
                  if (element.user_id === user.id) {
                    return (<UpdateReview review={element} userid={user.id} fid={id} />)
                  }
                  else {
                    return (
                      <ReviewList review={element} />
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlatDetails;
