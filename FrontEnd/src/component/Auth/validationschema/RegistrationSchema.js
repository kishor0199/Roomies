import * as Yup from 'yup';

// const passwordRegex = new RegExp("/^[a-zA-z0-9]{3,6}$/gmis");

const RegistrationSchema = Yup.object({
    firstname: Yup.string().min(3).required(),
    email: Yup.string().email("Please Enter Valid Email").required("Please Enter Email"),
    password: Yup.string().required(),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password Do Not Match").required("Please Enter Password!"),

    usertype: Yup.object().required("Some Error Occured Please Restart Registration Process!"),

    lastname: Yup.string().when('isAdmin', {
        is: false,
        then: Yup.string().min(3).required(),
        otherwise: null
    }),
    dob: Yup.date().when('isAdmin', {
        is: false,
        then: Yup.date("Bro Please!").required("This is Required Field"),
        otherwise: null
    }),
    occupation: Yup.string().when('isAdmin', {
        is: false,
        then: Yup.string().min(3).max(20).required(),
        otherwise: null
    }),
    gender: Yup.string().when('isAdmin', {
        is: false,
        then: Yup.string().min(4).max(6).required(),
        otherwise: null
    }),
    state: Yup.string().when('isAdmin', {
        is: false,
        then: Yup.string().min(3).max(20).required(),
        otherwise: null
    }),
    city: Yup.string().when('isAdmin', {
        is: false,
        then: Yup.string().min(3).max(20).required(),
        otherwise: null
    }),
})

export default RegistrationSchema;