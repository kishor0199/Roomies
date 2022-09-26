import React from "react";

function MainHome() {
  return (
    <div className="container col-9">
      <div className="card bg-dark text-white">
        <img className="card-img" src={require("../images/home.png")} alt="Card image" 
      
        />
        <div className="card-img-overlay">
          <h5 className="card-title text-black"   style={{
            "font-family": "Times New Roman, Times, serif",
            "font-size":"100px"
            }}>Roomies</h5>
          <p className="card-text text-black">
            
          </p>
          <p className="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
}

export default MainHome;
