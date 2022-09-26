import axios from "axios";

const getFlats="http://localhost:8080/flats/getAllFlats"

const deleteFlat="http://localhost:8080/flats/deleteFlat"

const insertFlat="http://localhost:8080/flats/insertFlat"

const getFlatById="http://localhost:8080/flats/getFlatById"

const getFlatByOwner="http://localhost:8080/flats/getFlatByOwner"

const getAllFlatsByCity="http://localhost:8080/flats/getAllFlatsByCity"

const getDocuments="http://localhost:8080/flats/getDocuments"

const updateDocument="http://localhost:8080/flats/updateDocument"

const updateFlat="http://localhost:8080/flats/updateFlat" 

const insertReview="http://localhost:8080/flats/insertReview"

const getReviews="http://localhost:8080/flats/reviews"

const updateReview="http://localhost:8080/flats/updateReview"

const deleteReview="http://localhost:8080/flats/deleteReview"

class FlatService
{

    getFlats()
    {
        return axios.get(getFlats);
    }

    deleteFlat(id)
    {
        return axios.delete(`${deleteFlat}/${id}`)
    }

    insertFlat(flat)
    {
        return axios.post(insertFlat,flat);
    }

    getFlatById(id)
    {
        return axios.get(`${getFlatById}/${id}`)
    }
    
    getFlatByOwner(id)
    {   
        console.log("In getFlatByOwner:id " + id)
        return axios.get(`${getFlatByOwner}/${id}`)
    }

    getAllFlatByCity(city)
    {   
        return axios.get(`${getAllFlatsByCity}/${city}`)
    }

    updateFlat(flat)
    {
        return axios.put(updateFlat,flat)
    }

    getReviews(id)
    {
        return axios.get(`${getReviews}/${id}`)
    }

    insertReview(data)
    {   
        console.log("AXIOS DATA : "+ JSON.stringify(data));
        return axios.post(insertReview,data);
    }

    updateReview(data)
    {
        return axios.put(updateReview,data);
    }

    deleteReview(data)
    {
        return axios({
            method:"delete",
            url:deleteReview,
            headers:{},
            data:{
              ...data
            }
        });
    }

    getDocuments(id)
    {
       return  axios.get(`${getDocuments}/${id}`)
    }

    updateDocument(data)
    {
       return  axios.put(`${updateDocument}`,data)
    }


}


export default new FlatService();