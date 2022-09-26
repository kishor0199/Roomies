import React from 'react';


function CustomerPhoneList(props)
{

    console.log(props.phonedata)
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

export default CustomerPhoneList;
