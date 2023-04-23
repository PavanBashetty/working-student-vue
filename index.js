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
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log("Server started...");
});

app.get("/", (req,res)=>{
    res.send("Hello from the working student app")
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
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
app.get("/api/getFilteredData/:searchby/:searchvalue/:workingStatus", (req,res)=>{
    let searchby = req.params.searchby;
    let searchvalue = req.params.searchvalue;
    let working_status = req.params.workingStatus;

    if(searchby == 'user_id'){
        searchby = 'uc.'.concat(searchby);
    }

    let query = `SELECT uc.user_id, concat(uc.first_name, " ", uc.last_name) as fullName, uc.university, cd.company_name, cd.type_of_work,
    DATE(cd.start_date) as start_date, DATE(cd.end_date) as end_date, cd.working_status, uc.working_hours  
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    WHERE cd.working_status = '${working_status}' and ${searchby} = '${searchvalue}' ORDER BY uc.user_id;`

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
    let query = `SELECT * FROM userCredentials WHERE user_id= '${userid}' and isAdmin = 'true'; SELECT count(*) as studentCount from userCredentials WHERE isAdmin = 'false'; SELECT count(DISTINCT university) as universityCount FROM userCredentials WHERE isAdmin = 'false';`

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
    DATE(cd.start_date) as start_date, DATE(cd.end_date) as end_date, SUM(wh.hours_worked) as hours_worked, cd.working_status
    FROM userCredentials uc
    JOIN companyDetails cd ON uc.user_id = cd.user_id
    JOIN workingHours wh ON cd.user_id = wh.user_id and cd.company_name = wh.company_name
    WHERE cd.user_id='${userid}' AND cd.working_status = 'Active' GROUP BY cd.company_name;`

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

//POST REST API METHOD TO UPDATE END DATE OF A COMPANY FOR USER. 
//Also, If end date is added to the row with 'Cat01', below POST method will update one of existing "Active" row's income tax bracket to "category 01" based on earliest start date.

app.post("/api/addEndDate", (req,res)=>{
    let user_id = req.body.user_id;
    let end_date = req.body.end_date;
    let company_name = req.body.company_name;

    let queryEndDateUpdate = `update companyDetails set end_date = '${end_date}', working_status = 'Inactive' where user_id = '${user_id}' and company_name = '${company_name}';`

    let queryToCheckAtleastOneCat01Row = `SELECT * FROM companyDetails WHERE user_id = '${user_id}' 
    and working_status = 'Active' and income_tax_bracket = 'Cat01';`

    let queryToUpdateTaxToCat01 = `UPDATE companyDetails SET income_tax_bracket = 'Cat01' WHERE user_id = ${user_id} and working_status = 'Active' ORDER BY start_date limit 1;`

    connection.query(queryEndDateUpdate,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        connection.query(queryToCheckAtleastOneCat01Row, (err,result)=>{
            if(err){
                res.json(500,{
                    msg:"Server issue, could not check at least one cat01 row"
                })
            }
            if(result.length < 1){
                connection.query(queryToUpdateTaxToCat01, (err,result)=>{
                    if(err){
                        res.json(500,{
                            msg:"Server issue, could not update to cat01"
                        })
                    }
                    res.json(200,{
                        msg:"End date added successfully!"
                    })
                })
            }else{
                res.json(200,{
                    msg:"End date added successfully!"
                })
            }
        })
    })
});

// POST REST API METHOD TO ADD NEW COMPANY DETAILS FOR A EMPLOYEE/USER.
// If the user already has active companies then below POST method will keep newly added row's income tax bracket to 'Cat05' else it will make it 'Cat01'
app.post("/api/newCompanyEntry",(req,res)=>{
    let user_id = req.body.user_id;
    let company_name = req.body.company_name;
    let type_of_work = req.body.type_of_work;
    let start_date = req.body.start_date;
    let gross_salary = req.body.gross_salary;

    let rowCount = `SELECT * FROM companyDetails WHERE user_id = '${user_id}' and 
    working_status = 'Active' and income_tax_bracket = 'Cat01'`;

    let insertQueryCat01 = `INSERT INTO companyDetails (user_id, company_name, type_of_work, start_date, gross_salary, income_tax_bracket) VALUES('${user_id}', '${company_name}','${type_of_work}','${start_date}', '${gross_salary}', 'Cat01'); INSERT INTO workingHours VALUES('${user_id}', '${company_name}', '${start_date}','0','0','0');`

    let insertQueryCat05 = `INSERT INTO companyDetails (user_id, company_name, type_of_work, start_date, gross_salary, income_tax_bracket) VALUES('${user_id}', '${company_name}','${type_of_work}','${start_date}', '${gross_salary}', 'Cat05'); INSERT INTO workingHours VALUES('${user_id}', '${company_name}', '${start_date}','0','0','0');`

    // let workingHoursQuery = `INSERT INTO workingHours VALUES('${user_id}', '${company_name}', '${start_date}','0','0','0');`

    connection.query(rowCount,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not insert the data"
            })
        }
        if(result.length >= 1){
            connection.query(insertQueryCat05, (err,result)=>{
                if(err){
                    res.json(500,{
                        msg:"Server issue, could not insert the data"
                    })
                }
                res.json(200,{
                    msg:"New company details added successfully!"
                })
            })
        }else{
            connection.query(insertQueryCat01,(err,result)=>{
                if(err){
                    res.json(500,{
                        msg:"Server issue, could not insert the data"
                    })
                }
                res.json(200,{
                    msg:"New company details added successfully!"
                })
            })
        }
        
    })

});


// GET REST API METHOD TO RETREIVE LIST OF ACTIVE COMPANY NAMES OF A SPECIFIC USER
app.get("/api/allComapanies/:user_id",(req,res)=>{

    let userid = req.params.user_id;
    let selectQuery = `SELECT company_name FROM companyDetails WHERE user_id = '${userid}' and working_status = 'Active'; SELECT company_name FROM companyDetails WHERE user_id = '${userid}';`

    connection.query(selectQuery, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not retreive data"
            })
        }
        res.send(200,{
            msg:"Active companies list fetched successfully!",
            data:result
        })
    })
})

// GET REST API METHOD TO RETREIVE ENTERED WORK HOURS FOR AN EMPLOYEE/USER
app.get("/api/enteredWorkHours/:user_id", (req,res)=>{

    let userid = req.params.user_id;
    let selectQuery = `SELECT wh.user_id, cd.company_name, wh.worked_date, wh.worked_week, wh.worked_month, wh.hours_worked, cd.working_status
    FROM workingHours wh
    JOIN companyDetails cd ON wh.user_id = cd.user_id AND wh.company_name = cd.company_name
    WHERE wh.user_id = '${userid}' AND wh.worked_week <> '0' ORDER BY wh.worked_date desc;`

    connection.query(selectQuery, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not reterive data"
            })
        }
        res.send(200,{
            msg:"Entered worked hours data fetched successfully",
            data:result
        })
    })
})

// GET REST API METHOD TO GET FILTERED ENTERED WORK HOURS FOR AN EMPLOYEE/USER
app.get("/api/filteredWorkHours/:user_id/:searchCompanyName/:searchWorkedMonth", (req,res)=>{
    let userid = req.params.user_id;
    let searchCompanyName = req.params.searchCompanyName;
    let searchWorkedMonth = req.params.searchWorkedMonth;

    let filterQuery = `SELECT wh.user_id, cd.company_name, wh.worked_date, wh.worked_week, wh.worked_month, wh.hours_worked, cd.working_status
    FROM workingHours wh
    JOIN companyDetails cd ON wh.user_id = cd.user_id AND wh.company_name = cd.company_name
    WHERE wh.user_id = '${userid}' AND wh.worked_week <> '0' AND wh.company_name = '${searchCompanyName}' AND wh.worked_month = ${searchWorkedMonth} ORDER BY wh.worked_date desc;`

    connection.query(filterQuery, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not reterive data"
            })
        }
        res.send(200,{
            msg:"Filtered worked hours data fetched successfully",
            data:result
        })
    })
})


// POST REST API METHOD TO ADD A NEW WORKED HOUR DETAILS OF AN EMPLOYEE/USER
app.post("/api/addNewWorkHourEntry",(req,res)=>{
    let user_id = req.body.user_id;
    let company_name = req.body.company_name;
    let worked_date = req.body.worked_date;
    let hours_worked = req.body.hours_worked;

    // code to get work week number and month
    
    let currWorkDate = new Date(worked_date);
    let year = new Date(currWorkDate.getFullYear(),0,1);
    let days = Math.floor((currWorkDate - year) / (24 * 60 * 60 * 1000));
    let worked_week = Math.ceil(days/7);
    let worked_month = currWorkDate.getMonth()+1;
    
    // back to rest api
    let queryToAddNewWorkHourEntry = `INSERT INTO workingHours VALUES('${user_id}','${company_name}','${worked_date}', '${worked_week}', '${worked_month}', '${hours_worked}'); UPDATE userCredentials SET working_hours = working_hours - ${hours_worked} WHERE user_id = '${user_id}';`

    connection.query(queryToAddNewWorkHourEntry, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"something went wrong"
            })
        }
        res.json(200,{
            msg:"New worked hour entry is successfull!"
        })
    })

})


// GET ACTIVE/INACTIVE COMPANIES COUNT, TOTAL WORKED HOURS NUMBER
app.get("/api/getcompanyactivitydetails/:user_id" ,(req,res)=>{
    
    let userid = req.params.user_id;
    let selectQuery = `SELECT SUM(wh.hours_worked) as hours_worked, wh.company_name, cd.working_status 
    FROM workingHours wh 
    JOIN companyDetails cd on wh.user_id = cd.user_id AND wh.company_name = cd.company_name
    WHERE wh.user_id = '${userid}' GROUP BY company_name;`

    connection.query(selectQuery,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not reterive data"
            })
        }
        res.send(200,{
            msg:"Companies related activity data fetched successfully",
            data:result
        })
    })
})


// GET REST API METHOD TO RETREIVE DATA FOR GRAPHS
app.get("/api/dataForGraphs/:user_id", (req,res)=>{
    let userid = req.params.user_id;

    let graphQuery = `SELECT worked_month, monthly_worked_hours as hours_worked FROM workHourGraph WHERE user_id = '${userid}' ORDER BY worked_month;`

    connection.query(graphQuery,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not reterive data"
            })
        }
        res.send(200,{
            msg:"Graph related data fetched successfully",
            data: result
        })
    })
})

// IN MOUNTED, use "isAdmin" also to make sure admin stay logged in admin portals and users stay logged in user portal
// adminArchivePage.vue is identical to adminPage.vue except for one("inactive") option
