let productsDB = require('../db/products.db');
let warehouseCreate = require('../db/warehouse.db').create;
let outletCreate = require('../db/outlet.db').create;

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
        request.body.product_id = request.body.id;
        let productPromise = new Promise((resolve,reject) => {
            productsDB.create(request.body , (err,rows) => {
                if(!err){
                    
                    resolve({ message: "product "});
                }
                else{
                    reject({ error: "failed request at product"})
                }
            })    
        })
            
        let warehousePromise = new Promise((resolve, reject) => {
                warehouseCreate(request.body , (err,rows) => {
                    if(!err){
                        resolve({ message: "warehouse "});
                    }
                    else{
                        reject({ error: "failed request at warehouse"});
                    }
                });
            });   
    
        let outletPromise = new Promise((resolve, reject) => {
                outletCreate(request.body , (err,rows) => {
                    if(!err){
                        resolve({ message: "outlet "});
                    }
                    else{
                        reject({ error: "failed request at warehouse"});
                    }
                });
            });

        Promise.all([productPromise , warehousePromise, outletPromise])
        .then(val => {
            response.json({db:val});
        }) 
        .catch(val => {
            response.json(val);
        })  
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