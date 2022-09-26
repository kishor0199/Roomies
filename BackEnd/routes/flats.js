const express = require('express')
const router = express.Router();


const flatcontroller = require("../controllers/flatcontroller");
const addFlat = require('../middleware/addFlat');
const { upload } = require('../middleware/image');


//http://localhost:8080/flats/insertFlat
router.post("/insertFlat", upload.array('image', 3), (req, res) => {

    console.log("\n In Flat Route\n " + (JSON.stringify(req.body)));

    const FilesObj = JSON.parse(JSON.stringify(req.files));
    console.log("\n\n" + JSON.stringify(FilesObj) + "\n\n");

    req.body.image1 = req.body.image2 = req.body.image3 = "null";
    for (let i = 0; i < FilesObj.length && i < 3; i++) {
        // Insert Images using Service
        if (i === 0)
            req.body.image1 = FilesObj[i].path;
        else if (i === 1)
            req.body.image2 = FilesObj[i].path;
        else if (i === 2)
            req.body.image3 = FilesObj[i].path;
    }

    flatcontroller.insertFlatController(req, res);
})


//http://localhost:8080/flats/updateFlat
router.put("/updateFlat", upload.array('image', 3), (req, res) => {


    let imageUpdate = parseInt(req.body.imagechange);
    if (imageUpdate === 1) {
        req.body.image1 = req.body.image2 = req.body.image3 = "null";
        const FilesObj = JSON.parse(JSON.stringify(req.files));
        for (let i = 0; i < FilesObj.length && i < 3; i++) {
            // Insert Images using Service
            if (i === 0)
                req.body.image1 = FilesObj[i].path;
            else if (i === 1)
                req.body.image2 = FilesObj[i].path;
            else if (i === 2)
                req.body.image3 = FilesObj[i].path;
        }
    }
    flatcontroller.updateFlatController(req, res);
})



//http://localhost:8080/flats/getAllFlats
router.get("/getAllFlats", (req, res) => {
    flatcontroller.getAllFlatController(req, res);
})

//http://localhost:8080/flats/getAllFlatsByCity
router.get("/getAllFlatsByCity/:city", (req, res) => {
    flatcontroller.getAllFlatByCityController(req, res);
})


//http://localhost:8080/flats/getFlatById/2
router.get("/getFlatById/:id", (req, res) => {
    flatcontroller.getFlatByIdController(req, res);
})

//http://localhost:8080/flats/getFlatByOwner/:id
router.get("/getFlatByOwner/:id", (req, res) => {
    flatcontroller.getFlatByOwnerController(req, res);
})

//http://localhost:8080/flats/deleteFlat/1
router.delete("/deleteFlat/:id", (req, res) => {
    flatcontroller.deleteFlatController(req, res);
})

//http://localhost:8080/flats/reviews/3
router.get("/reviews/:id", (req, res) => {
    flatcontroller.getAllreviewController(req, res);
})


//http://localhost:8080/flats/updateReview
router.put("/updateReview", (req, res) => {
    flatcontroller.updateReviewController(req, res);
})

//http://localhost:8080/flats/insertReview
router.post("/insertReview", (req, res) => {
    flatcontroller.insertReviewController(req, res);
})


//http://localhost:8080/flats/deleteReview
router.delete("/deleteReview", (req, res) => {
    flatcontroller.deleteReviewController(req, res);
})


//http://localhost:8080/flats/getDocuments/1
router.get("/getDocuments/:id",(req,res)=>{
    flatcontroller.getDocumentsController(req,res);
})

//http://localhost:8080/flats/updateDocument
router.put("/updateDocument",(req,res)=>{
    flatcontroller.updateDocumentController(req,res);
})

module.exports = router;

