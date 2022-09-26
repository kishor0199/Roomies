import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import FlatService from "../../serivces/FlatService";
import FaltCard from "./FaltCard";

const FlatByCity = () => {
    let city = useParams().city;

    const [data, setData] = useState([{}])

    let navigate = useNavigate();

    useEffect(() => {
        getData().then(data => {
            if (data.length === 0) {
                setTimeout(() => {
                    navigate(- 1);
                }, 2000);
            }
        })
    }, [])

    const getData = async () => {
        let result = await FlatService.getAllFlatByCity(city);
        setData(result.data);
        console.log(result.data)
        return result.data;
    }
    return (
        <>
            {data.length !== 0 &&
                <div className="row">
                    <FaltCard data={data} />
                </div>
            }{data.length === 0 &&
                <div class="col-sm-6 offset-sm-3 mt-5 alert alert-danger" role="alert">
                    No Listing Found In this City
                </div>
            }
        </>

    )
}

export default FlatByCity