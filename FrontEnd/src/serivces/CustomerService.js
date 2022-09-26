import axios from 'axios';

const getUsers="http://localhost:8080/users/getAllUsers"
const getUserById="http://localhost:8080/users/getUserById/"
const updateUser="http://localhost:8080/users/updateUser/"
const deleteUser="http://localhost:8080/users/deleteUser/"
const addUser="http://localhost:8080/users/insertUser/"


class CustomerService
{
   getCustomers()
   {
       return  axios.get(getUsers);
   }

   addCustomer(data)
   {
        return axios.post(addUser,data);
   }

   deleteCustomer(id)
   {
        
        return axios.delete(deleteUser+`${id}`);
   }

   getCustomerById(id)
   {
        
        return axios.get(getUserById+`${id}`)
   }


   updateCustomer(data)
   {
       
        return axios.put(updateUser,data);
   }

}


export default new CustomerService();