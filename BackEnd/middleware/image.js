const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {

        console.log("\nIn File Name");
        console.log("Request Path : " + req.path);
        // let entity;
        // if (req.path === "/insertHostelImg/" || req.path === " /updateHostelImg/") {
        //     entity = 'HOSTEL';
        // } else if (req.path === "/insertFlatImg/") {
        //     entity = 'FLAT';
        // }
        // const obj = JSON.parse(JSON.stringify(req.body));
        // console.log(obj)
        cb(null, uuidv4() +req.body.owner_id + ".png");
        console.log("\n\n");
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file    
    console.log("In FileFilter");

    // const FilesObj = JSON.parse(JSON.stringify(req.files));
    // const {profileImages} = FilesObj;
    // console.log(FilesObj);


    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        console.log("\nIn Multer\n");
        cb(null, true);
    } else {
        cb(new Error("Something Went Wrong"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});




module.exports = { upload, fileFilter, storage };