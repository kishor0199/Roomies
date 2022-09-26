const express = require("express");
const router = express.Router();
const multer = require('multer');
const { User, sequelize } = require('../models/User');
const { QueryTypes } = sequelize;
const db = require('../config/db_config');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, Date.now() +"hostel"+req.body.name+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file    
    // console.log("In FileFilter");
    // const obj = JSON.parse(JSON.stringify(req.body));
    // console.log(obj)

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // console.log("\nIn Multer\n");
        cb(null, true);
    } else {
        cb(new Error("Something Went Wrong"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// router.post("/", upload.single('profileImage'), async (req, res, next) => {
router.post("/", upload.fields([{ name: 'profileImage', maxCount: 2 }]), async (req, res, next) => {
    const { name, password, email } = req.body;
    // console.log(req.body);
    const FilesObj = JSON.parse(JSON.stringify(req.files));
    const {profileImage} = FilesObj;

    profileImage.forEach(element => {
        console.log("\n Path : "+element.path+"\n");
    });
    
    // console.log(profileImage[0].path);
    // const profileImage1 = FilesObj[0].path;

    const users = new Promise((resolve, reject) => {
        db.query(`Insert into admins (name,email,password,profileimage) values("${name}","${email}","${password}","${profileImage}");`, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    });
    users.then((user) => {
        console.log("\n\n IN POST" + user);
    });

    console.log("\n" + JSON.stringify(req.body));
    res.send("File Uploaded Successfully");
});

module.exports = router;