const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send("Access Denied (Secure Token Not Found)");
    try {
        const user  =  jwt.verify(token, process.env.JWTSECRET);
        console.log("\n\n\nMiddleWare Owner " + user.role);
        console.log("\n\n\nMiddleWare REQ BODY " + JSON.stringify(req.body));
        if (user.role === 1 ) {
            next();
        } else {
            req.status(401).send("You Are Unathorized to make a Call");
        }
    } catch (error) {
        res.status(400).send("Invalid Token!")
    }
};