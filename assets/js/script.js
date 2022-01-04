var express = require('express');
var router = express.Router();
var db = require('../js/buddy');
router.get('/form', function(req, res, next) {
    res.render('/');
});
router.post('/', function(req, res, next) {

    // store the user input data

const userInfo = req.body;

var sql = 'INSERT INTO users SET ?';
db.query(sql, userInfo, function (err,data) {
    if (err) throw err;
    console.log("User info added to table");

});

})


//user interface js

//form submit

const formSubmit = async (event) => {
    event.preventDefault();

    //create const for first name and email, for later use

    const name = document.querySelector("#firstName").value.trim();
    const email = document.querySelector("#email").value.trim();

    if (name && email) {
        console.log("first name and email submitted");
    }
    else
    {
        alert("Failed to enter name and email");
    };

    document
    .addEventListener('submit', formSubmit);
};

