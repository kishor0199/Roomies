import React, { useEffect, useState } from 'react';
import phoneservice from '../../serivces/PhoneService';
import CustomerPhoneList from './CustomerPhoneList';

function CustomerPhone(props)
{
    const [phonedata,setData]=useState([])


    useEffect(()=>{
        getPhone(props.id);
    },[])


    const getPhone=(id)=>{
        phoneservice.getPhone(id).then((res)=>{
            setData(res.data);
        })
    };


    return(
        <>
            <CustomerPhoneList phonedata={phonedata}/>
        </>
    )
        
   
    
}

export default CustomerPhone;