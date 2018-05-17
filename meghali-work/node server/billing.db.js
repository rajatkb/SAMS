let database = require('./database');
module.exports=(function(){
    let createTableSQL =    " create table if not exists BILLING ("+
                            " id int not null unique auto_increment ,"+
                            " transactionId varchar(30) not null,"+
                            " productId varchar(30) not null,"+
                            " count int not null,"+
                            " category int not null,"+
                            " deliveryStatus boolean not null,"+
                            " date date,"+
                            "time time,"+
                            " totalCost int,"+
                            " primary key(id))"                           
                            ;


    let billingState = new Promise((resolve , reject) => {
        database.query(createTableSQL,null,(error, results) => {
            if(error){
                console.log("log: failed to create table BILLING");
                reject(error);
            }
            else{
                console.log("log: created table BILLING if not exists");
                resolve(results);
            }
        })
    });	
    function _create(new_data,callback){
		item_keys=Object.keys(new_data.items);

        let insertionList=[];
        for(var key=0;key<Object.keys(new_data.items).length;key++){            
            var new_entry={transactionId: new_data.transactionId,productId: item_keys[key], 
                           count: new_data.items[item_keys[key]], 
                           category:new_data.category,
                           deliveryStatus:new_data.deliveryStatus,
                           date:new_data.date, 
                           time:new_data.time, 
                           totalCost: new_data.totalCost
                        };
            insertionList.push(new_entry);
        };

	    billingState.then((value) => {
            for(var i=0;i<insertionList.length;i++){
                database.query("insert into BILLING set ? ",insertionList[i],(err,results)=>{
                    // error is false when the result is true
                    if(!err){
                        console.log("log: data inserted for id : ", insertionList[i].productId);
                        callback(err,results);
                    }else{
                        console.log("log: eror while inserting data into BILLING table for id =", insertionList[i].productId);
                        callback(err,results);
                    }
                });
            }
            
        }).catch((error) => {
            console.log("log: no BILLING table available");
        });
    }
    
    function _getProductsBilling(callback){
        billingState.then((value) => {
            database.query("select * from BILLING",null,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: BILLING table emitted");
                    callback(err,results);
                }else{
                    console.log("log: error retrieving BILLING table");
                    callback(err,results);
                }
            });
        }).catch((error) => {
            console.log("log: no BILLING table available");
        });
    }
    function _getProductBilling(transactionId,callback){
        billingState.then((val) => {
            database.query("select productId,count from billing where transactionId=?" , transactionId , (err , results) => {
                if(!err){
                   console.log(results);
                    console.log("log: data emitted from BILLING transactionId : "+transactionId);
                    callback(err , (results));
                }
                else{
                    console.log("log: error retrieving from BILLING transactionId =" + transactionId);
                    callback(err,results);
                }
            });
        }).catch((err) => {
            console.log("log: no BILLING table available");
        });
    }
    function _updateProductDeliveryStatus(transactionId,deliveryStatus,callback){
        billingState.then((val) => {
            database.query("update BILLING set deliveryStatus = ? where transactionId = ?" , [deliveryStatus,transactionId] , (err, results)=>{
                if(!err){
                    console.log("log: BILLING deliveryStatus changed transactionId : "+transactionId);
                    callback(err,results);
                }else{
                    console.log("log: BILLING could not be changed transactionId : "+transactionId);
                    callback(err,results);
                }
                
            });
        }).catch((err) => {
            console.log("log: no BILLING table available");
        })
    }

    return {
        create:_create,
        getProductsBilling:_getProductsBilling,
        getProductBilling:_getProductBilling,
        updateProductDeliveryStatus: _updateProductDeliveryStatus
    }

})();