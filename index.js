const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const {query} = require("express");
const {json} = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, './frontend/dist')));

// TILL EMPLOYER LIST TABLE

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server started...");
});

app.get("/", (req,res)=>{
    res.send("Hello from the working student app")
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    if(err) throw err
    console.log("Working student database connected successfully!");
});

// POST REST API METHOD TO ADD NEW USERS/EMPLOYEE INTO THE DATABASE
app.post("/api/signup", (req,res)=>{
    console.log("Requesting to add a new user..");
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let university = req.body.university;
    let email = req.body.email;
    let password = req.body.password;

    let query = `INSERT INTO userCredentials (first_name, last_name, age, university, email, user_password) VALUES('${firstName}','${lastName}','${age}','${university}','${email}','${password}');`

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"something went wrong"
            })
        }
        res.json(200,{
            msg:"user registered successfully!"
        })
    })
});

// GET REST API METHOD TO CHECK LOGIN CREDENTIALS
app.get("/api/login/:emailID", (req,res)=>{
    let emailID = req.params.emailID;
    let query = `SELECT * FROM userCredentials WHERE email = '${emailID}';`

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not retreive data"
            })
        }
        res.send(200,{
            msg:"Data fetched successfully",
            data:result
        })
    })
});