import React, { useRef } from 'react';

const ac=require("../images/ac.png")
const canteen=require("../images/canteen.png")
const lift=require("../images/lift.png")
const tv=require("../images/tv.png")
const wifi=require("../images/wifi.png")
const wm=require("../images/wm.png")
const bed=require("../images/bed.png")
const parking=require("../images/parking.png")

function Icon(props)
{   

    if(props.show == 1 && props.iname=="tv")
    {
        return (<img src={tv} className="ms-4" width={75} height={55} ></img>)
    }
    else if(props.show==1 && props.iname=="canteen")
    {
        return (<img src={canteen} className="ms-4"  width={75} height={55} ></img>)
    }
    else if(props.show==1 && props.iname=="wm")
    {
        return (<img src={wm}  className="ms-4" width={75} height={55} ></img>)
    }
    else if(props.show==1 && props.iname=="lift")
    {
        return (<img src={lift} className="ms-4" width={75} height={55} ></img>)
    }
    else if(props.show==1 && props.iname=="wifi")
    {
        return (<img src={wifi} className="ms-4" width={75} height={55} ></img>)
    }
    else if(props.show==1 && props.iname=="ac")
    {
        return (<img src={ac} className="ms-4" width={75} height={55} ></img>)
    }

    else if(props.show==1 && props.iname=="bed")
    {
        return (<img src={bed} className="ms-4" width={75} height={55} ></img>)
    }

    else if(props.show==1 && props.iname=="parking")
    {
        return (<img src={parking} className="ms-4" width={75} height={55} ></img>)
    }
    

}

export default Icon