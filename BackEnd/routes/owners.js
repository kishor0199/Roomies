const express=require('express');
const ownercontroller = require('../controllers/ownercontroller');

const router=express.Router();

//http://localhost:8080/owners/getAllOwners
router.get("/getAllOwners",(req,res)=>{
    ownercontroller.getAllOwnerController(req,res);
})

//http://localhost:8080/owners/getOwnerByid/1
router.get("/getOwnerById/:id",(req,res)=>{
    ownercontroller.getOwnerByIdController(req,res);
})


//http://localhost:8080/owners/insertOwner/
router.post("/insertOwner",(req,res)=>{
    ownercontroller.insertOwnerController(req,res);
})

//http://localhost:8080/owners/updateOwner/
router.put("/updateOwner",(req,res)=>{
    ownercontroller.updateOwnerController(req,res);
})

//http://localhost:8080/owners/deleteOwner/1
router.delete("/deleteOwner/:id",(req,res)=>{
    ownercontroller.deleteOwnerController(req,res);
})

//https://localhost:8080/owners/getOwnerPhoneno/1
router.get("/getOwnerPhoneno/:id",(req,res)=>{
    ownercontroller.getOwnerPhonenoController(req,res);
})


module.exports=router;