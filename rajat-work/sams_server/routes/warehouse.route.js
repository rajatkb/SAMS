let warehouseDB = require('../db/warehouse.db');
module.exports = function(app){
	app.get('/productsWarehouse',function(request , response){
        let warehouse = {};
        warehouseDB.getProductsWarehouse((err,rows) => {
            if(!err){
                rows.forEach(val => {
                    warehouse[val.product_id] = val;
                });
                response.json(warehouse);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.get('/productWarehouse/:product_id',function(request , response){
        warehouseDB.getProductWarehouse(request.params.product_id , (err,rows) => {
            if(!err)
                response.json(rows[0]);
            else
                response.json({ error: "failed request"});
        });
    });

    app.post('/productWarehouse',function(request , response){
        warehouseDB.create(request.body , (err,rows) => {
            if(!err)
                response.json({ message: "added data"});
            else
                response.json({ error: "failed request"});
        });
    });

    app.put('/productWarehouse/:product_id',function(request , response){
        warehouseDB.updateProductWarehouseCount( request.params.product_id,request.body.count,(err,result) => {
            if(!err)
                response.json({ message: "changed state"});
            else
                response.json({ error: "failed request"});
        });
    });	
};