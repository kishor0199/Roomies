
const hostelservice =require("../services/hostelservices");


module.exports.getAllHostelController= async(req,res)=>{

    const result=await hostelservice.getAllHostelService();

    res.send(result);

}

module.exports.getAllHostelByCityController= async(req,res)=>{
    const city = req.params.city;
    const result=await hostelservice.getAllHostelByCityService(city);
    res.send(result);

}

module.exports.getHostelByOwnerController=async(req,res)=>{
    const id=req.params.id;
    const result=await hostelservice.getHostelByOwnerService(id);
    res.send(result);   
}

module.exports.insertHostelController=async(req,res)=>{
    let id=req.body.hoste_id;
    let addr=req.body.address;
    const result=await hostelservice.insertHostelService(req.body);
    console.log(req.body);
    const result2=await hostelservice.insertDocumentByIdService(req.body);
    res.send(result);
}

module.exports.getHostelByIdController=async(req,res)=>{
    let id=req.params.id;
    const result=await hostelservice.getHostelByIdService(id);
    res.send(result);
}

module.exports.updateHostelController=async(req,res)=>{
    const result=await hostelservice.updateHostelService(req.body);
    res.send(result);

}

module.exports.deleteHostelController=async(req,res)=>{
    let id=req.params.id;
    const result=await hostelservice.deleteHostelService(id);
    res.send(result);

}

module.exports.getAllReviewsController=async(req,res)=>{
    let id=req.params.id;
    const result=await hostelservice.getAllReviewsService(id);
    res.send(result);
}


module.exports.updateReviewController=async(req,res)=>{
    let review=req.body;
    const result=await hostelservice.updateReviewService(review);
    res.send(result)
}

module.exports.insertReviewController=async(req,res)=>{
    let review=req.body;
    const result=await hostelservice.insertReviewService(review);
    res.send(result);
}


module.exports.deleteReviewController=async(req,res)=>{
    let review=req.body;
    const result=await hostelservice.deleteReviewService(review)
    res.send(result);
}

module.exports.getDocumentsController=async(req,res)=>{
    let id=req.params.id;
    const result=await hostelservice.getDocumentService(id);
    res.send(result);
}

module.exports.updateDocumentController=async(req,res)=>{
    let id=req.body.hostel_id;
    console.log(req.body);
    const result1=await hostelservice.deleteDocument(id);
    const result2=await hostelservice.insertDocumentService(req.body);
    res.send(result2);
}

