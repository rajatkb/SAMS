let express = require('express');
let database = require('./db/database');

database.query("select 1+1 as sum",null,(rows)=>{
    console.log(rows[0]);
});






