let express = require('express');
let database = require('./db/database');
let productsDB = require('./db/products');

database.query("select 1+1 as sum",null,(rows)=>{
    console.log(rows[0]);
});
var data1={id:"a101", name:"maggi",brand_name:"maggi", category_name:"food",description:"lorem ipsum",price:20,status:true};
productsDB.create(data1);







