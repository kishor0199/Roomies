const express = require("express");
const router = express.Router();
const db = require("../models");
const { User } = db;
const jwt = require("jsonwebtoken");


//Login Route
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("\n Email : " + email + "  Password" + password);

    let user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    });

    if (!user) return res.status(400).send("Invalid email or password");


    const jwtData = { id: user.id, name: user.name, role: user.role };
    const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });
    res.send(token);
});

module.exports = router;


