let database = require('./database');
module.exports=(function(){
		let createTableSQL = 	" create table if not exists OUTLET ("+
								" id int not null unique AUTO_INCREMENT,"+
								" product_id varchar(30) not null,"+
								" shelf int not null,"+
								" sold int not null,"+
								" primary key(id) )";

		let outletState = new Promise((resolve , reject) => {
        database.query(createTableSQL,null,(error, results) => {
	            if(error){
	                console.log("log: failed to create table OUTLET");
	                reject(error);
	            }
	            else{
	                console.log("log: created table OUTLET if not exists");
	                resolve(results);
	            }
	        })
	    });

		function _create(data,callback){
			let new_data = {
					product_id:data.product_id,
					shelf:0,
					sold:0
			};
			outletState.then((value) => {
	            database.query("insert into OUTLET set ? ",new_data,(err,results)=>{
	                // error is false when the result is true
	                if(!err){
	                    console.log("log: OUTLET data inserted for id : ",data.product_id);
	                    callback(err,results);
	                }else{
	                    console.log("log: eror while inserting data into OUTLET table for id =",data.product_id);
	                    callback(err,results);
	                }
	            });
	        }).catch((error) => {
	            console.log("log: no OUTLET table available");
	        });
		}

		function _getProductsOutlet(callback){
		    outletState.then((value) => {
		        database.query("select * from OUTLET",null,(err,results)=>{
		            // error is false when the result is true
		            if(!err){
		                console.log("log: OUTLET table emitted");
		                callback(err,results);
		            }else{
		                console.log("log: error retrieving OUTLET table");
		                callback(err,results);
		            }
		        });
		    }).catch((error) => {
		        console.log("log: no OUTLET table available");
		    });
		}

		function _getProductOutlet(id,callback){
		    outletState.then((val) => {
		        database.query("select * from OUTLET where product_id = ?" , id , (err , results) => {
		            if(!err){
		                console.log("log: data emitted from OUTLET id : "+id);
		                callback(err , results);
		            }
		            else{
		                console.log("log: error retrieving from OUTLET id =" + id);
		                callback(err,results);
		            }
		        });
		    }).catch((err) => {
		        console.log("log: no OUTLET table available");
		    });
		}

		function _updateProductOutletShelf(id,count,callback){
	        outletState.then((val) => {
	            database.query("update OUTLET set shelf = shelf + ? where product_id = ?" , [count,id] , (err, results)=>{
	                if(!err){
	                    console.log("log: OUTLET shelf count changed id : "+id);
	                    callback(err,results);
	                }else{
	                    console.log("log: OUTLET shelf could not be changed id : "+id);
	                    callback(err,results);
	                }
	                
	            });
	        }).catch((err) => {
	            console.log("log: no OUTLET table available");
	        })
	    }

	    function _updateProductOutletSold(id,count,callback){
	        outletState.then((val) => {
	            database.query("update OUTLET set sold = sold + ?, shelf = shelf - ? where product_id = ?" , [count,count,id] , (err, results)=>{
	                if(!err){
	                    console.log("log: OUTLET sold count changed id : "+id);
	                    callback(err,results);
	                }else{
	                    console.log("log: OUTLET sold could not be changed id : "+id);
	                    callback(err,results);
	                }
	                
	            });
	        }).catch((err) => {
	            console.log("log: no OUTLET table available");
	        })
	    }

		return {
			create:_create,
			getProductOutlet:_getProductOutlet,
			getProductsOutlet:_getProductsOutlet,
			updateProductOutletShelf:_updateProductOutletShelf,
			updateProductOutletSold:_updateProductOutletSold
		}

})();