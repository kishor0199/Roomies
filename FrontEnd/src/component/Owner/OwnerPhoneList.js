import React from 'react';


function OwnerPhoneList(props)
{

    let str=" ";
    props.phonedata.map((element)=>{
        str=element.phone+" "+str;
    })

    return(
       <>
       <td>{str}</td>
        </>
    )

}

export default OwnerPhoneList;
