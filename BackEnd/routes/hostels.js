const express = require('express');
const router = express.Router();
const ownerMiddleware = require('../middleware/owner');
const { upload } = require('../middleware/image');
const hostelcontroller = require("../controllers/hostelcontroller")



//http://localhost:8080/hostels/insertHostelImg/
router.post("/insertHostelImg", upload.array('image', 3), (req, res) => {
    
    const FilesObj = JSON.parse(JSON.stringify(req.files));
    console.log("\n\n" + JSON.stringify(FilesObj) + "\n\n");
    req.body.image1 = req.body.image2 = req.body.image3 = "null";
    for (let i = 0; i < FilesObj.length; i++) {
        // Insert Images using Service
        if(i === 0)
        req.body.image1 = FilesObj[i].path;
        else if(i === 1)
        req.body.image2 = FilesObj[i].path;
        else if(i === 2)
        req.body.image3 = FilesObj[i].path;
    }
    
    console.log("\n In route\n " + (JSON.stringify(req.body)));
    hostelcontroller.insertHostelController(req, res);  

})

//http://localhost:8080/hostels/updateHostelImg/
router.put("/updateHostelImg", upload.array('image', 3),(req, res) => {
    const FilesObj = JSON.parse(JSON.stringify(req.files));
    console.log("\n\n" + JSON.stringify(FilesObj) + "\n\n");
    let imageUpdate = parseInt(req.body.imagechange);
    if (imageUpdate === 1) {
        req.body.image1 = req.body.image2 = req.body.image3 = "null";
        for (let i = 0; i < FilesObj.length && i < 3;  i++) {
            // Insert Images using Service
            if(i === 0)
            req.body.image1 = FilesObj[i].path;
            else if(i === 1)
            req.body.image2 = FilesObj[i].path;
            else if(i === 2)
            req.body.image3 = FilesObj[i].path;
        }
    }
    hostelcontroller.updateHostelController(req, res);
})


//http://localhost:8080/hostels/getAllHostels
router.get("/getAllHostels", (req, res) => {
    hostelcontroller.getAllHostelController(req, res);
})

//http://localhost:8080/hostels/getAllHostelByCity/CityName
router.get("/getAllHostelByCity/:city", (req, res) => {
    hostelcontroller.getAllHostelByCityController(req, res);
})

//http://localhost:8080/hostels/deleteHostel/1
router.delete("/deleteHostel/:id", ownerMiddleware, (req, res) => {
    hostelcontroller.deleteHostelController(req, res);
})

//http://localhost:8080/hostels/updateHostel/
router.put("/updateHostel", (req, res) => {
    hostelcontroller.updateHostelController(req, res);
})

//http://localhost:8080/hostels/insertHostel/
router.post("/insertHostel", (req, res) => {
    hostelcontroller.insertHostelController(req, res);
})


//http://localhost:8080/hostels/getHostelByOwner/:id
router.get("/getHostelByOwner/:id", (req, res) => {
    hostelcontroller.getHostelByOwnerController(req, res);
})

//http://localhost:8080/hostels/getHostelById/
router.get("/getHostelById/:id", (req, res) => {
    hostelcontroller.getHostelByIdController(req, res);
})

//http://localhost:8080/hostels/reviews/3
router.get("/reviews/:id", (req, res) => {
    hostelcontroller.getAllReviewsController(req, res);
})

//http://localhost:8080/hostels/updateReview
router.put("/updateReview/", (req, res) => {
    hostelcontroller.updateReviewController(req, res);
})

//http://localhost:8080/hostels/insertReview
router.post("/insertReview", (req, res) => {
    hostelcontroller.insertReviewController(req, res);
})

//http://localhost:8080/hostels/deleteReview
router.delete("/deleteReview", (req, res) => {
    hostelcontroller.deleteReviewController(req, res);
})



//http://localhost:8080/hostels/getDocuments/1
router.get("/getDocuments/:id",(req,res)=>{
    hostelcontroller.getDocumentsController(req,res);
})


//http://localhost:8080/hostels/updateDocument
router.put("/updateDocument",(req,res)=>{
    hostelcontroller.updateDocumentController(req,res);
})


module.exports = router;