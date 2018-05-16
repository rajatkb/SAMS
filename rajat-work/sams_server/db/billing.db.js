let database = require('./database');
module.exports=(function(){
    let createTableSQL =    "create table if not exists BILLING ("+
                            " id varchar(30) not null ,"+
                            " transactionId varchar(30) not null"+
                            " product_id varchar(30) not null,"+
                            " count int not null,"+
                            " status int not null,"+
                            " deliveryStatus int not null"+
                            " date date,"+
                            " primary key(id) )"
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
    function _create(data,callback){
		let new_data = {
                id:data.id,
                transactionId:data.transactionId,
				product_id:data.product_id,
                count:data.count,
                status: data.status,
                deliveryStatus:data.deliveryStatus,
                date: data.date
		};
	    billingState.then((value) => {
            database.query("insert into BILLING set ? ",new_data,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: data inserted for id : ",data.product_id);
                    callback(err,results);
                }else{
                    console.log("log: eror while inserting data into BILLING table for id =",data.id);
                    callback(err,results);
                }
            });
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
            database.query("select transactionId,product_id,count from billing where transactionId=?" , transactionId , (err , results) => {
                if(!err){
                    console.log("log: data emitted from BILLING transactionId : "+transactionId);
                    callback(err , results);
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

});
