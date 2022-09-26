const userservice=require('../services/userservices')


module.exports.getAllUserController= async (req,res)=>{
    
    const result =await userservice.getAllUserService();

    res.send(result)


    
    // userservice.getAllUserService().then((result)=>{
    //     res.send(result)
    // }).catch((err)=>{
    //     res.send(err);
    // })
}

module.exports.getUserByIdController=(req,res)=>{
    let id=req.params.id
    userservice.getUserByIdService(id).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err);
    })
}

module.exports.getUserPhonenoController=(req,res)=>{
    let id=req.params.id
    userservice.getUserPhonenoService(id).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err);
    })
}

module.exports.insertUserController= async (req,res)=>{
   
    const result=await userservice.insertUserService(req.body);
    const reuslt1=await userservice.insertPhonenoService(req.body);
   
}

module.exports.updateUserController= async (req,res)=>{
    let id=req.body.user_id
    const result1=await userservice.deletePhonenoService(id)
    const result=await userservice.updateUserService(req.body)  
    const reuslt2=await userservice.insertPhonenoByIdService(req.body,id);
}   


module.exports.deleteUserController= async(req,res)=>{
    let id=req.params.id;
    const result =userservice.deleteUserService(id);
}
   
