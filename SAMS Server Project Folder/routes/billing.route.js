let billingDB = require('../db/billing.db');
let outletDB = require('../db/outlet.db');

module.exports = function(app){
	app.get('/productsBilling',function(request , response){
        let billing = {};
        
        billingDB.getProductsBilling((err,rows) => {
            if(!err){
                
                rows.forEach(val => {
                    if(billing[val.transactionId]===undefined)
                    {
                        billing[val.transactionId]={transactionId:val.transactionId,
                                                    date:val.date.toString().substring(0,10),
                                                    category:val.category,
                                                    deliveryStatus:val.deliveryStatus,
                                                    totalCost: val.totalCost,
                                                    time:val.time,
                                                    items:{[val.productId]: val.count} 
                                                    };
                    }
                    else{
                        billing[val.transactionId].items[val.productId]=val.count;
                    }
                });
                
                response.json(billing);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.get('/productBilling/:transactionId',function(request , response){
        let transaction = undefined;
        billingDB.getProductBilling(request.params.transactionId,(err,rows) => {
            if(!err){
                
                rows.forEach(val => {
                    if(transaction === undefined){
                        transaction={   transactionId:val.transactionId,
                                        date:val.date.toString().substring(0,10),
                                        category:val.category,
                                        deliveryStatus:val.deliveryStatus,
                                        totalCost: val.totalCost,
                                        time:val.time,
                                        items:{[val.productId]: val.count} 
                                    };
                        transaction['items'][val.productId]=val.count;
                    }
                    else{
                        transaction['items'][val.productId]=val.count;   
                    }
                    
                });
                
                response.json(transaction);
            }
            else
                response.json({ error: "failed request"});
        });
    });

    app.post('/productBilling/order',function(request , response){
        billingDB.create(request.body , (err,rows) => {
            if(!err)
                response.json({ message: "log: /productBilling added data"});
            else
                response.json({ error: "log: /productBilling failed request"});
        });
    });

    app.post('/productBilling/sale',function(request , response){
        
        new Promise((resolve , reject) => {
                        billingDB.create(request.body , (err,rows) => {
                            if(!err)
                                resolve(request.body.items);
                            else
                                reject({ error: "failed request"});
                        });
        }).then( items => {
                        return Promise.all(Object.keys(items).map(productId => {
                            return new Promise((resolve,reject) => {
                                    outletDB.updateProductOutletSold(productId , items[productId], (err , result) =>{
                                        if(!err){
                                            resolve(productId);
                                        }
                                        else{
                                            reject(productId);
                                        }  
                                    });
                            });
                        }));
        }).then(val => {
                        console.log("log: new sale data entried transation id :"+request.body.transactionId);
                        response.json({message:"success" , list:val});
        }).catch( val => {
                        console.log("log: failed at data transaction data entry "+request.body.transactionId);
                        response.json({error:"failed" , list:v});
        });
        
    });    

    app.put('/productBilling/order/:transactionId',function(request , response){

        new Promise((resolve,reject) => {
                    let transaction = undefined;
                    billingDB.getProductBilling(request.params.transactionId,(err,rows) => {
                    if(!err){                        
                        rows.forEach(val => {
                            if(transaction === undefined){
                                transaction={   
                                                items:{[val.productId]: val.count} 
                                            };
                                transaction['items'][val.productId]=val.count;
                            }
                            else{
                                transaction['items'][val.productId]=val.count;   
                            }
                            
                        });
                        
                        resolve(transaction);
                    }
                    else
                        reject(err);
                });
        }).then( transaction => {
                    return Promise.all(Object.keys(transaction.items).map(productId => {
                        return new Promise((resolve,reject) => {
                                outletDB.updateProductOutletShelf(productId , transaction.items[productId], (err , result) =>{
                                    if(!err){
                                        resolve(productId);
                                    }
                                    else{
                                        reject(productId);
                                    }  
                                });
                        });
                    })); 
                    
        }).then( val => {
                    return new Promise((resolve,reject) => {
                        billingDB.updateProductDeliveryStatus( request.params.transactionId,request.body.deliveryStatus,(err,result) => {
                            if(!err){
                                resolve({ message: "changed state",list:val});
                            }
                            else{

                                reject({ error: "failed request",list:val});
                            }
                        });
                    });
        }).then(val => {
                    response.json(val);
        }).catch( err => {
                    response.json(err);
        });

        
    });	
};