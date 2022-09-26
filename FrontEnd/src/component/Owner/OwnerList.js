import { useEffect, useState } from 'react';
import ownerservice from '../../serivces/OwnerService';
import Icon from '../Icon';
import OwnerPhone from './OwnerPhone';





function OwnerList()
{
    const [data,setData]=useState([]);

   
    let owner={}

  
    useEffect(()=>{
        getownerData()
    },[]);

    const getownerData=()=>{
        ownerservice.getOwners().then((res)=>{
            setData(res.data)
        })
    }  
    
    const updateowner=(id)=>{
        ownerservice.getOwnerById(id).then((res)=>{
                owner=res.data;
        })
    }    

    
    const deleteOwner=(id)=>{
       ownerservice.deleteOwner(id).then((res)=>{alert("deleted")});
       window.location.reload();
    }  
      
    return(
    <>
        <Icon src="imge.jpg"/>
        <div className="container-fluid">
        <table className="table table-light mt-5">
        <thead>
            <tr>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>DOB</th>
                <th>Occupation</th>
                <th>City</th>
                <th>Age</th>
                <th>Gender</th>
                <th>State</th>
                <th>Email</th>
                <th colSpan={"3"}>Phone no</th>
            </tr>
        </thead>
          <tbody>
             {
                data.map((element)=>{
                    return(
                    <tr key={element.owner_id}>
                        <td>{element.owner_id}</td>
                      <td>{element.namefirst}</td>
                      <td>{element.namelast}</td>
                      <td>{element.dob}</td>
                      <td>{element.occupation}</td>
                      <td>{element.city}</td>
                      <td>{element.age}</td>
                      <td>{element.gender}</td>
                      <td>{element.state}</td>
                      <td>{element.email}</td> 
                      <td><OwnerPhone id={element.owner_id}/></td>
                    <td>
                     <a href={"update/"+element.owner_id}>
                        <button className='btn btn-success'>Update</button>
                    </a>
                    <a className="ms-3">
                        <button className='btn btn-danger' onClick={()=>{deleteOwner(element.owner_id)}}>Delete</button>
                    </a>
                    </td>
                    </tr>
                    )
                })
             }  
         </tbody>
        </table>
        </div>
    
    </>
    );
}

export default OwnerList;