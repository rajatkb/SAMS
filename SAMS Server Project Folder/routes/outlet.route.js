let outletDB = require('../db/outlet.db');

module.exports = function(app){

	app.get('/productsOutlet',function(request , response){
        let outlet = {};
        outletDB.getProductsOutlet((err,rows) => {
            if(!err){
                rows.forEach(val => {
                    outlet[val.product_id] = val;
                });
                response.json(outlet);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.get('/productOutlet/:product_id',function(request , response){
        outletDB.getProductOutlet(request.params.product_id , (err,rows) => {
            if(!err)
                response.json(rows[0]);
            else
                response.json({ error: "failed request"});
        });
    });

    // app.post('/productOutlet',function(request , response){
        // outletDB.create(request.body , (err,rows) => {
        //     if(!err)
        //         response.json({ message: "added data"});
        //     else
        //         response.json({ error: "failed request"});
        // });
    // });

    app.put('/productOutlet/shelf/:product_id',function(request , response){
        outletDB.updateProductOutletShelf( request.params.product_id,request.body.shelf,(err,result) => {
            if(!err)
                response.json({ message: "changed state"});
            else
                response.json({ error: "failed request"});
        });
    });

    app.put('/productOutlet/sold/:product_id',function(request , response){
        outletDB.updateProductOutletSold( request.params.product_id,request.body.sold,(err,result) => {
            if(!err)
                response.json({ message: "changed state"});
            else
                response.json({ error: "failed request"});
        });
    });


};