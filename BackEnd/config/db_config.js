const mysql = require('mysql2');
require("dotenv").config();

module.exports=mysql.createPool({

    host:'localhost',
    user:'root',
    password:'root',
    database:'roomies',
});
