const e = require('express');
var express = require('express');
var router = express.Router();

const usercontroller=require('../controllers/usercontroller');


//localhost:8080/users/getAllUsers
router.get('/getAllUsers', function(req, res, next) {
    usercontroller.getAllUserController(req,res);
});


//localhost:8080/users/getUserById/2
router.get("/getUserById/:id",function(req,res,next){
    usercontroller.getUserByIdController(req,res);
})

//localhost:8080/users/getUserPhoneno/1
router.get("/getUserPhoneno/:id",function(req,res,next){
  usercontroller.getUserPhonenoController(req,res);
})


//localhost:8080/users/insertUser/
router.post("/insertUser",function(req,res,next){
  usercontroller.insertUserController(req,res);
})

//localhost:8080/users/updateUser/
router.put("/updateUser",function(req,res){
  usercontroller.updateUserController(req,res);
})

////localhost:8080/users/deleteUser/4
router.delete("/deleteUser/:id",function(req,res){
  usercontroller.deleteUserController(req,res);
})


module.exports = router;
