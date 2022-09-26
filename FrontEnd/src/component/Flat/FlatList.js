import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import flatservice from "../../serivces/FlatService";
import FaltCard from './FaltCard';
import FlatTable from './FlatTable';


function FlatList({ user }) {


  let id = useParams().id;
  console.log("\n\n Flat list Owner Id" + id)

  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  // const getData= async()=>{
  //    const result= await flatservice.getFlats()
  //     setData(result.data);
  //     console.log(result.data)
  // }

  const getData = async () => {
    let result;
    if (id === undefined) {
      result = await flatservice.getFlats();
      setData(result.data);
    } else {
      result = await flatservice.getFlatByOwner(id);
      console.log(result)
      setData(result.data);
    }
  }

  const deleteFlat = async (id) => {
    let result = await flatservice.deleteFlat(id);
    window.location.reload();
  }

  return (
    <>
      <div className="container-fluid">
        {user && (user.role === 1 || user.role === 4) && <table className="table table-light mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Owner Name</th>
              <th>Flat Type</th>
              <th>Require members</th>
              <th>Looking For</th>
              <th>Deposite</th>
              <th>Rent</th>
              <th>Furnished Type</th>
              <th>City</th>
              <th colSpan={4}>State</th>
            </tr>
          </thead>
          <tbody>
            <FlatTable data={data} user={user} deleteFlat={deleteFlat} />
          </tbody>
        </table>}

        {user && user.role === 2 && 
        <>
        <div className="row">
        <FaltCard  data={data} />
        </div>
        </>
        }
      </div>
    </>
  );
}


export default FlatList;