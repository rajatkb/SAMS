const express = require('express');
var pool = require('./pool');
const bodyParser = require('body-parser');
const app = express();
const product = require('./products');
const port = 3000;

//product.init();
//var data1={id:"a101", name:"maggi",brand_name:"maggi", category_name:"food",description:"lorem ipsum",price:20};


//product.create(data1);

//app.get('/products',product.get_all_products);
//app.get('/products/a101',product.get_product_id_details(a101));

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})