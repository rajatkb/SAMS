let productsDB = require('../db/products.db');

module.exports = function(app){

    app.get('/products',function(request , response){
        let product = {};
        productsDB.getProducts((err,rows) => {
            if(!err){
                rows.forEach(val => {
                    product[val.id] = val;
                });
                response.json(product);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.get('/product/:product_id',function(request , response){
        productsDB.getProduct(request.params.product_id , (err,rows) => {
            if(!err)
                response.json(rows[0]);
            else
                response.json({ error: "failed request"});
        });
    });

    app.post('/product',function(request , response){
        productsDB.create(request.body , (err,rows) => {
            if(!err)
                response.json({ message: "added data"});
            else
                response.json({ error: "failed request"});
        });
    });

    app.put('/product/:product_id',function(request , response){
        productsDB.updateProductState( request.params.product_id,request.body.status,(err,result) => {
            if(!err)
                response.json({ message: "changed state"});
            else
                response.json({ error: "failed request"});
        });
    });
};