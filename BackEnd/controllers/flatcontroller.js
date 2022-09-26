const flatservice=require("../services/flatservices");


module.exports.getAllFlatController=async (req,res)=>{

    let result=await flatservice.getAllFlatService();
    res.send(result);
}

module.exports.getAllFlatByCityController=async (req,res)=>{
    let city = req.params.city;
    let result=await flatservice.getAllFlatByCityService(city);
    res.send(result);
}

module.exports.getFlatByIdController=async(req,res)=>{
    let id=req.params.id;
    let result=await flatservice.getFlatByIdService(id);
    console.log("\n\n"+id + " Result " + result )
    res.send(result);
}

module.exports.getFlatByOwnerController=async(req,res)=>{
    let id=req.params.id;
    let result=await flatservice.getFlatByOwnerService(id);
    res.send(result);
}

module.exports.insertFlatController=async(req,res)=>{
    let flat=req.body;
    let result=await flatservice.insertFlatService(flat);
    let result2=await flatservice.insertDocumentByIdService(flat)
    res.send(result);
}

module.exports.updateFlatController=async(req,res)=>{
    let flat=req.body;
    console.log(flat);
    let result=await flatservice.updateFlatService(flat);
    res.send(result.message);
}

module.exports.deleteFlatController=async(req,res)=>{
    let id=req.params.id;
    let result=await flatservice.deleteFlatService(id);
    res.send(result.message);
}

module.exports.getAllreviewController=async(req,res)=>{
    let id=req.params.id;
    let result=await flatservice.getAllReviewsService(id);
    res.send(result);
}

module.exports.updateReviewController=async(req,res)=>{
    let review=req.body;
    let result=await flatservice.updateReviewService(review);
    res.send(result);
}

module.exports.insertReviewController=async(req,res)=>{
    let review=req.body;
    let result=await flatservice.insertReviewService(review);
    res.send(result);
}

module.exports.deleteReviewController=async(req,res)=>{
    let review=req.body;
    let result=await flatservice.deleteReviewService(review);
    res.send(result);
}


module.exports.getDocumentsController=async(req,res)=>{
    let id=req.params.id;
    const result=await flatservice.getDocumentService(id);
    res.send(result);
}

module.exports.updateDocumentController=async(req,res)=>{
    let id=req.body.flat_id;
    const result1=await flatservice.deleteDocument(id);
    const result2=await flatservice.insertDocumentService(req.body);
    res.send(result2);
}


