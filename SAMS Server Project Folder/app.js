let express = require('express');
let bodyParser = require('body-parser');


let database = require('./db/database');
let app = express();
let port = 8008;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// for CROSS Origin request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
  });

//routes
let outlet = require('./routes/outlet.route')(app);
let warehouse = require('./routes/warehouse.route')(app);
let products = require('./routes/products.route')(app);


app.listen(port,"localhost",(err) => {
    if(!err)
        console.log("server running at port : "+port);
    else
        console.log("log: failed "+err);
});

 









