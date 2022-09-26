const express = require("express");
const router = express.Router();
const db = require("../models");
const { User, UserDetails, OwnerDetails } = db;
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


// Current User Information 
router.get("/", auth, async (req, res) => {
    try {
        const profile = await User.findOne({
            where: { id: req.user.id },
            attributes: ["email", "name", "role"],
            include: [OwnerDetails, UserDetails]
        });
        console.log(profile);
        res.send(profile);
    } catch (error) {
        console.log(error);
    }

});

// Register User
router.post("/", async (req, res) => {
    const { email, usertype, firstname, lastname, dob, occupation, city, gender, state, password } = req.body;
    let role;
    if (usertype.usertype === "admin") {
        role = 4;
    }
    else if (usertype.usertype === "user") {
        role = 2;
    }
    else if (usertype.usertype === "owner") {
        role = 1;
    }

    function calculate_age(dob) {
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    console.log(req.body);

    // Checking User
    var user = await User.findOne({ where: { email: email } });
    if (user) return res.status(400).send("User already exists");

    // Save User Into Database
    try {
        user = new User({ email, name: firstname, password, role });
        var newuser = await user.save();

        //Condition Checking on userType

        if (usertype.usertype === "user") {
            newuser.createUser({
                user_id: newuser.id,
                namefirst: firstname,
                namelast: lastname,
                dob: dob,
                occupation: occupation,
                city: city,
                age: calculate_age(new Date(dob)),
                gender: gender,
                state: state,
            });
        }
        else if (usertype.usertype === "owner") {
            newuser.createOwner({
                owner_id: newuser.id,
                namefirst: firstname,
                namelast: lastname,
                dob: dob,
                occupation: occupation,
                city: city,
                age: calculate_age(new Date(dob)),
                gender: gender,
                state: state,
            });
        }

        // Generate Token
        const jwtData = { id: newuser.id, name: newuser.name, role: newuser.role };
        const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });
        console.log(token);
        res.send(token);

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error !");
    }
});

module.exports = router;
