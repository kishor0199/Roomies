import axios from 'axios';

const getOwners="http://localhost:8080/owners/getAllOwners"
const addOwner="http://localhost:8080/owners/insertOwner/"
const deleteOwner="http://localhost:8080/owners/deleteOwner/"
const getOwnerById="http://localhost:8080/owners/getOwnerById/"
const updateOwner="http://localhost:8080/owners/updateOwner/"

class OwnerService
{
     getOwners()
    {
        return axios.get(getOwners);
    }

    getOwnerById(id)
    {
        return axios.get(getOwnerById+id);
    }

    deleteOwner(id)
    {
        return axios.delete(deleteOwner+id)
    } 

    addOwner(owner)
    {
        console.log(owner)
        return axios.post(addOwner,owner);
    }

    updateOwner(owner)
    {
        return axios.put(updateOwner,owner);
    }


}

export default new OwnerService();