import axios from "axios";

const getHostels="http://localhost:8080/hostels/getAllHostels"
const deleteHostel="http://localhost:8080/hostels/deleteHostel" 
const getHostelById="http://localhost:8080/hostels/getHostelById"
const getAllHostelByCity="http://localhost:8080/hostels/getAllHostelByCity"
const updateHostel="http://localhost:8080/hostels/updateHostel/"
const updateHostelImg="http://localhost:8080/hostels/updateHostelImg/"
const insertHostel="http://localhost:8080/hostels/insertHostel/"
const insertHostelImg="http://localhost:8080/hostels/insertHostelImg/"
const getReviews="http://localhost:8080/hostels/reviews"
const UpdateReview="http://localhost:8080/hostels/updateReview"
const insertReview="http://localhost:8080/hostels/insertReview"
const deleteReview="http://localhost:8080/hostels/deleteReview"
const getHostelByOwner="http://localhost:8080/hostels/getHostelByOwner"

const getDocuments="http://localhost:8080/hostels/getDocuments"
const updateDocument="http://localhost:8080/hostels/updateDocument";


class HostelService
{
   
    getHostels()
    {
        return axios.get(getHostels);
    }

    deleteHostel(id)
    {
        return axios.delete(`${deleteHostel}/${id}`);
    }

    getHostelById(id)
    {   
        console.log("In getHostelBy:id " + id)
        return axios.get(`${getHostelById}/${id}`)
    }

    getAllHostelByCity(city)
    {   
        return axios.get(`${getAllHostelByCity}/${city}`);
    }

    getHostelByOwner(id)
    {   
        console.log("In getHostelByOwner:id " + id)
        return axios.get(`${getHostelByOwner}/${id}`)
    }

    updateHostel(hostel)
    {
        return axios.put(updateHostel,hostel);
    }

    updateHostelImg(hostel)
    {
        return axios.put(updateHostelImg,hostel);
    }

    insertHostel(hostel)
    {
        return axios.post(insertHostel,hostel);
    }

    insertHostelImg(hostel)
    {
        return axios.post(insertHostelImg,hostel);
    }
    
    getReviews(id)
    {
        return axios.get(`${getReviews}/${id}`);
    }

    updateReview(data)
    {
        return axios.put(UpdateReview,data);
    }

    insertReview(data)
    {
        return axios.post(insertReview,data);
    }

    deleteReview(data)
    {   
        console.log(data);
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
        return axios.get(`${getDocuments}/${id}`)
    }

    updateDocument(data)
    {
        console.log(data);
        return axios.put(updateDocument,data);
    }

}




export default new HostelService();