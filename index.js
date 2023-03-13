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

// GET REST API METHOD TO DISPLAY ALL WORKING STUDENT'S DETAILS ON ADMIN PAGE
app.get("/api/workingStudentsList", (req,res)=>{

    let query = `SELECT uc.user_id, concat(uc.first_name, " ", uc.last_name) as fullName, uc.university, cd.company_name, cd.type_of_work,
    DATE(cd.start_date) as start_date, cd.working_status, uc.working_hours  
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    WHERE cd.working_status = 'Active' ORDER BY uc.user_id;`

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

// GET REST API METHOD TO DISPLAY FILTERED WORKING STUDENT'S DETAILS ON ADMIN PAGE
app.get("/api/getFilteredData/:searchby/:searchvalue", (req,res)=>{
    let searchby = req.params.searchby;
    let searchvalue = req.params.searchvalue;

    if(searchby == 'user_id'){
        searchby = 'uc.'.concat(searchby);
    }

    let query = `SELECT uc.user_id, concat(uc.first_name, " ", uc.last_name) as fullName, uc.university, cd.company_name, cd.type_of_work,
    DATE(cd.start_date) as start_date, cd.working_status, uc.working_hours  
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    WHERE cd.working_status = 'Active' and ${searchby} = '${searchvalue}' ORDER BY uc.user_id;`

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not retreive data"
            })
        }
        res.send(200,{
            msg:"Filtered data fetched successfully",
            data:result
        })
    })
});


// GET REST API METHOD TO DISPLAY ADMIN DETAILS
app.get("/api/admindetails/:userid", (req,res)=>{

    let userid = req.params.userid;
    let query = `SELECT * FROM userCredentials WHERE user_id= '${userid}' and isAdmin = 'true'`;

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


// GET REST API METHOD TO DISPLAY ARCHIVED WORKING STUDENT'S DETAILS ON ADMIN ARCHIVE PAGE
app.get("/api/getArchivedWorkingStuList", (req,res)=>{

    let query = `SELECT uc.user_id, concat(uc.first_name, " ", uc.last_name) as fullName, uc.university, cd.company_name, cd.type_of_work,
    DATE(cd.start_date) as start_date, DATE(cd.end_date) as end_date, cd.working_status 
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    WHERE cd.working_status = 'Inactive' ORDER BY uc.user_id;`

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not retreive data"
            })
        }
        res.send(200,{
            msg:"Archived data fetched successfully",
            data:result
        })
    })
})


// GET REST API METHOD TO DISPLAY USER DETAILS
app.get("/api/userdetails/:user_id", (req,res)=>{
    let userid = req.params.user_id;

    let query = `SELECT * FROM userCredentials WHERE user_id= '${userid}';`

    connection.query(query,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not retreive data"
            })
        }
        res.send(200,{
            msg:"User details fetched successfully",
            data:result
        })
    })
});

// GET REST API METHOD TO DISPLAY CURRENT COMPANIES LIST OF AN EMPLOYEE/USER
app.get("/api/currentCompList/:user_id",(req,res)=>{

    let userid = req.params.user_id;

    let query = `SELECT uc.user_id, cd.company_name, cd.type_of_work,
    DATE(cd.start_date) as start_date, DATE(cd.end_date) as end_date, cd.working_status
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    WHERE cd.user_id='${userid}' AND cd.working_status = 'Active';`

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not reterive data"
            })
        }
        res.send(200,{
            msg:"Current companies list data fetched successfully",
            data:result
        })
    })
});

//POST REST API METHOD TO UPDATE END DATE OF A COMPANY FOR USER
app.post("/api/addEndDate", (req,res)=>{
    let user_id = req.body.user_id;
    let end_date = req.body.end_date;
    let company_name = req.body.company_name;

    let queryUpdate = `update companyDetails set end_date = '${end_date}' where user_id = '${user_id}' and company_name = '${company_name}';`

    connection.query(queryUpdate,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        res.json(200,{
            msg:"End date added successfully!"
        })
    })
});

// POST REST API METHOD TO ADD NEW COMPANY DETAILS FOR A EMPLOYEE/USER
app.post("/api/newCompanyEntry",(req,res)=>{
    let user_id = req.body.user_id;
    let company_name = req.body.company_name;
    let type_of_work = req.body.type_of_work;
    let start_date = req.body.start_date;
    let gross_salary = req.body.gross_salary;

    let insertQuery = `INSERT INTO companyDetails (user_id, company_name, type_of_work, start_date, gross_salary) VALUES('${user_id}', '${company_name}','${type_of_work}','${start_date}', '${gross_salary}');`

    connection.query(insertQuery, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not insert the data"
            })
        }
        res.json(200,{
            msg:"New company details added successfully!"
        })
    })
});


// IN MOUNTED, use "isAdmin" also to make sure admin stay logged in admin portals and users stay logged in user portal
// adminArchivePage.vue is identical to adminPage.vue except for one("inactive") option
// create admin header so to reduce repeated code in components