
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hostelservice from "../../serivces/HostelService";
import HostelTable from "./HostelTable";
import HostelCard from "./HostelCard";


function HostelList({ user }) {

  let id = useParams().id;

  const [data, setData] = useState([{}])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let result;
    if (id === undefined) {
      result = await hostelservice.getHostels();
      setData(result.data);
    } else {
      result = await hostelservice.getHostelByOwner(id);
      setData(result.data);
    }

    console.log(result.data)
  }

  const deleteHostel = async (id) => {
    let result = await hostelservice.deleteHostel(id);
    window.location.reload();
  }
  return (
    <>
      <div className="container-fluid">
        {/* <table className="table table-light mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Owner name</th>
              <th>Hostel Name</th>
              <th>Total rooms</th>
              <th>Available rooms</th>
              <th>requirement</th>
              <th>Single bed rooms</th>
              <th>Double bed rooms</th>
              <th>Room fee</th>
              <th>Canteen fee</th>
              <th>City</th>
              <th colSpan={4}>State</th>
            </tr>
          </thead>
        {  <tbody>
            
              data.map((element) => {
                return (
                  <tr key={element.hostel_id}>
                    <td>{element.hostel_id}</td>
                    <td>{element.namefirst}</td>
                    <td>{element.name}</td>
                    <td>{element.total_rooms}</td>
                    <td>{element.available_rooms}</td>
                    <td>{element.requirement}</td>
                    <td>{element.no_of_singlebed}</td>
                    <td>{element.no_of_doublebed}</td>
                    <td>{element.room_fee}</td>
                    <td>{element.canteen_fee}</td>
                    <td>{element.city}</td>
                    <td>{element.state}</td>
                    <td>
                      <a href={"/hostel/"+element.hostel_id}>
                        <button className="btn btn-dark">Details</button>
                      </a>
                    </td>{user && (user.role === 4 || user.role === 1) && <>
                      <td>
                        <a href={"/hostel/update/" + element.hostel_id}>
                          <button className="btn btn-success">Update</button>
                        </a>
                      </td>
                      <td>
                        <a>
                          <button className="btn btn-danger" onClick={() => { deleteHostel(element.hostel_id) }}>Delete</button>
                        </a>
                      </td></>}
                  </tr>
                )
              })
            } 
          </tbody>
        </table>*/}
        {user && (user.role === 4 || user.role === 1) &&
          <>
            <table className="table table-light mt-5">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Owner name</th>
                  <th>Hostel Name</th>
                  <th>Total rooms</th>
                  <th>Available rooms</th>
                  <th>requirement</th>
                  <th>Single bed rooms</th>
                  <th>Double bed rooms</th>
                  <th>Room fee</th>
                  <th>Canteen fee</th>
                  <th>City</th>
                  <th colSpan={4}>State</th>
                </tr>
              </thead>
              <tbody>
                <HostelTable deleteHostel={deleteHostel} user={user} data={data} />
              </tbody>
            </table>
          </>
        }

        {user && user.role === 2 && 
        <>
        <div className="row">
        <HostelCard  data={data} />
        </div>
        </>
        }
      </div>
    </>
  );
}

export default HostelList;