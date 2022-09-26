import React, { useEffect, useState } from 'react';
import phoneservice from '../../serivces/PhoneService';
import OwnerPhoneList from './OwnerPhoneList';

function OwnerPhone(props)
{
    const [phonedata,setData]=useState([])


    useEffect(()=>{
        getPhone(props.id);
    },[])


    const getPhone=(id)=>{
        phoneservice.getOwnerPhone(id).then((res)=>{
            setData(res.data);
        })
    };

    return(
        <>
            <OwnerPhoneList phonedata={phonedata}/>
        </>
    )
        
   
    
}

export default OwnerPhone;