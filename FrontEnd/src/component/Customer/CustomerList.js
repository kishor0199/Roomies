import { useEffect, useState } from 'react';
import customerservice from '../../serivces/CustomerService';
import CustomerPhone from './CustomerPhone';




function CustomerList()
{
    const [data,setData]=useState([]);

   
    let customer={}

  
    useEffect(()=>{
        getCustomerData()
    },[]);

    const getCustomerData=()=>{
        customerservice.getCustomers().then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    }  

    
    const updateCustomer=(id)=>{
        customerservice.getCustomerById(id).then((res)=>{
                customer=res.data;
        })
    }    

    
    const deleteCustomer=(id)=>{
       customerservice.deleteCustomer(id).then((res)=>{alert("deleted")});
       window.location.reload();
    }  

    return(
    <>
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
                    <tr key={element.user_id}>
                        <td>{element.user_id}</td>
                      <td>{element.namefirst}</td>
                      <td>{element.namelast}</td>
                      <td>{element.dob}</td>
                      <td>{element.occupation}</td>
                      <td>{element.city}</td>
                      <td>{element.age}</td>
                      <td>{element.gender}</td>
                      <td>{element.state}</td>
                      <td>{element.email}</td> 
                      <td><CustomerPhone id={element.user_id}/></td>
                    <td>
                     <a href={"update/"+element.user_id}>
                        <button className='btn btn-success'>Update</button>
                    </a>
                    <a className="ms-3">
                        <button className='btn btn-danger' onClick={()=>{deleteCustomer(element.user_id)}}>Delete</button>
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

export default CustomerList;