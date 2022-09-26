import React from 'react';

import axios from 'axios';


const getphone="http://localhost:8080/users/getUserPhoneno/"

const getOwnerPhone="http://localhost:8080/owners/getOwnerPhoneno/"

class PhonenoService
{
    getPhone(id)
    {
        console.log(getphone+id);
        return axios.get(getphone+id);
    }

    getOwnerPhone(id)
    {
        console.log(getOwnerPhone+id);
        return axios.get(getOwnerPhone+id);
    }
}

export default new PhonenoService();