import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import hostelservice from "../../serivces/HostelService";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "../Icon";
import ReviewList from "./ReviewList.js";
import "../../css/image.css"
import Review from "./Review";
import UpdateReview from "./UpdateReview";
import MessageBox from "./MessageBox";
import { MdAdd } from "react-icons/md";
import MapContainer from "../Map";

function HostelDetails({ user }) {
  let id = useParams().id;
  let [hostel, setHostel] = useState([]);

  let [reviews, setReviews] = useState([]);

  let [documents, setDocuments] = useState([]);

  useEffect(() => {
    getData(id);
    getAllReviews(id);
    getAllDocuments(id);

  }, []);

  const getData = (id) => {
    hostelservice.getHostelById(id).then((result) => {
      console.log(id);
      hostel = result.data[0];
      setHostel(hostel);
      console.log(hostel);
    });
  };
  const getAllReviews = (id) => {
    hostelservice.getReviews(id).then((result) => {
      reviews = result.data;
      console.log(reviews);
      setReviews(reviews);
    });
  };

  const getAllDocuments = (id) => {
    hostelservice.getDocuments(id).then((result) => {
      documents = result.data;
      setDocuments(documents);
      console.log(documents);
    });
  };

  const contactOwner = (id) => {
    console.log(id);
  };
  console.log("IN DETAILS");
  console.log(user);
  return (
    <div className="container  col-lg-12 bg-light">
      <div className="row">
        <div className="col-3">
          <div className="mt-3 wt-25">
            <img
              className="img-thumbnail rounded-circle border-dark border-5"
              src={require("../../images/hall.jpg")}
            ></img>
          </div>
          <div className="text-center">
            <h3>
              <span>{hostel.namefirst}</span>
              <span>{hostel.namelast}</span>
            </h3>
          </div>
          <div className="text-center mt-3 list-inline">
            <button
              className="mb-5 btn btn-dark fw-bold list-inline-item fs-5 "
              data-bs-toggle="collapse"
              data-bs-target="#chat"
            >
              message
              <span className="ms-3 text-center list-inline-item">
                <img src={require("../../images/chat.png")} width={25} />
              </span>
            </button>
            <MapContainer/>

          </div>
          <div
            className=" collapse border border-black mt-4 bottomright"
            id="chat"
          >
            <MessageBox uname={user.name} oname={hostel.namefirst + " " + hostel.namelast} />
          </div>
        </div>
        <div className=" col-9 mt-4 border border-dark">
          <h3 className="mt-4">{hostel.name}</h3>
          <div className="row col-9">
            <div className="col-3 ">
              <span className="fw-bold">Hostel for {hostel.requirement}</span>
            </div>
            <div className="col-1">
              <Rating precision={0.5} value={2.5} readOnly />
            </div>
          </div>
          <div className="row col-6">
            <div className="col-1">
              <img src={require("../../images/location.png")} width="20" />
            </div>
            <div className="col-1 text-left">
              <h5 className="text-secondary">{hostel.city}</h5>
            </div>
          </div>
          <hr className="bg-dark" />
          <h3>Info</h3>
          <div className="row text-left mt-3">
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Total rooms</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Available rooms</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Single Bed</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-secondary ">Double Bed</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3 text-center">
              <h5 className="text-success ">{hostel.total_rooms}</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-success ">{hostel.available_rooms}</h5>
            </div>
            <div className="col-3 text-center">
              <h5 className="text-success ">{hostel.no_of_singlebed}</h5>
            </div>
            <div className="col-3 text-center ">
              <h5 className="text-success">{hostel.no_of_doublebed}</h5>
            </div>
          </div>
          <hr className="bg-dark" />
          <h3>Pictures</h3>
          <div className="">
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
            {hostel && hostel.image1 === "null" && 
              <img src={require("../../images/kitchen.jpg")}></img>}
              {hostel && hostel.image1 && 
              <img src={`http://localhost:8080/`+hostel.image1} ></img>}
            </div>
           
            <div>
            {hostel && hostel.image2 === "null" && 
              <img src={require("../../images/bedroom.jpg")}></img> }
              {hostel && hostel.image2 && 
              <img src={`http://localhost:8080/`+hostel.image2} ></img>}
            </div>
           
            <div>
            {hostel && hostel.image3 === "null" && 
              <img src={require("../../images/hall.jpg")}></img> }
            {hostel && hostel.image3 && 
              <img src={`http://localhost:8080/`+hostel.image3} ></img>}
            </div>
          </Carousel></div>
          <hr className="bg-dark" />
          <h3>Amenities</h3>
          <div className="mt-3">
            <Icon show={hostel.is_canteen_available} iname="canteen" />
            <Icon show={hostel.is_washing_machine_available} iname="wm" />
            <Icon show={hostel.is_wifi_available} iname="wifi" />
            <Icon show={hostel.is_lift_available} iname="lift" />
            <Icon show={hostel.is_tv_available} iname="tv" />
            <Icon show={hostel.is_ac_available} iname="ac" />
          </div>
          <hr className="bg-dark" />
          <h3>Address</h3>
          <div className=" border border-info">
            <p className="ms-2 fw-bold">
              {hostel.address}
              {"  " + hostel.zipcode}
            </p>
          </div>
          <hr className="bg-dark" />
          <h3>Description</h3>
          <div className="border border-info">
            <p className="ms-2 fw-bold">
              <ui className="list-inline">
                <li className="list-inline-item text-danger">
                  Required documents:
                </li>
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
            </button>
            
            { user && user.role === 2 && <>
            <button
              className="btn ms-4 rounded-circle btn-success"
              data-bs-toggle="collapse"
              data-bs-target="#addreview"
              aria-expanded="false"
              id="addbtn"
              aria-controls="reviews"
              disabled={reviews.some(element => element.user_id === user.id)}>
              <MdAdd size={32} />
            </button>
            
            </>}
          </div>

          <div className="collapse mt-3 border border-black" id="addreview">
            <Review uid={user.id} hid={id} />
          </div>
          <div className="collapse mt-3" id="reviews">
            <div className="row">
              {
                reviews.map((element) => {
                  if (element.user_id === user.id) {
                    return (<UpdateReview review={element} userid={user.id} hid={id} />)
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

export default HostelDetails;
