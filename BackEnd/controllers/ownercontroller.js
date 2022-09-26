const ownerservice = require("../services/ownerservices")

module.exports.getAllOwnerController= async(req,res)=>{
    let reuslt=await  ownerservice.getAllOwnerService();
    res.send(reuslt);
}

module.exports.getOwnerByIdController=async(req,res)=>{
    let id=req.params.id;
    let result=await ownerservice.getOwnerByIdService(id);
    res.send(result);
}


module.exports.insertOwnerController=async(req,res)=>{
    let result=await ownerservice.insertOwnerService(req.body);
    let ressult1=await ownerservice.insertPhonenoService(req.body);
    
}

module.exports.updateOwnerController=async(req,res)=>{
    let id=req.body.owner_id;
    let result1=await ownerservice.deletePhoneService(id);
    let result=await ownerservice.updateOwnerService(req.body);
    let reuslt=await ownerservice.insertPhonenoByIdService(req.body,id);
}

module.exports.deleteOwnerController=async(req,res)=>{
    let id=req.params.id;
    let result=await ownerservice.deleteOwnerService(id);
    res.send(result);
}

module.exports.getOwnerPhonenoController=async(req,res)=>{
    let id=req.params.id;
    let result=await ownerservice.getOwnerPhonenoService(id);
    res.send(result);
}