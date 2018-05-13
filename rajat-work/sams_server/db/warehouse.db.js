let database = require('./database');
module.exports = (function(){
	let createTableSQL = 	"create table if not exists WAREHOUSE ("+
							" id int not null unique AUTO_INCREMENT,"+
							" product_id varchar(30) not null,"+
							" count int not null,"+
							" primary key(id) )"
							;

	let warehouseState = new Promise((resolve , reject) => {
        database.query(createTableSQL,null,(error, results) => {
            if(error){
                console.log("log: failed to create table WAREHOUSE");
                reject(error);
            }
            else{
                console.log("log: created table WAREHOUSE if not exists");
                resolve(results);
            }
        })
    });						

	function _create(data,callback){
		let new_data = {
				product_id:data.product_id,
				count:data.count,
		};
		warehouseState.then((value) => {
            database.query("insert into WAREHOUSE set ? ",new_data,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: data inserted for id : ",data.product_id);
                    callback(err,results);
                }else{
                    console.log("log: eror while inserting data into WAREHOUSE table for id =",data.id);
                    callback(err,results);
                }
            });
        }).catch((error) => {
            console.log("log: no WAREHOUSE table available");
        });
	}

	function _getProductsWarehouse(callback){
        warehouseState.then((value) => {
            database.query("select * from WAREHOUSE",null,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: WAREHOUSE table emitted");
                    callback(err,results);
                }else{
                    console.log("log: error retrieving WAREHOUSE table");
                    callback(err,results);
                }
            });
        }).catch((error) => {
            console.log("log: no WAREHOUSE table available");
        });
    }

    function _getProductWarehouse(id,callback){
        warehouseState.then((val) => {
            database.query("select * from WAREHOUSE where product_id = ?" , id , (err , results) => {
                if(!err){
                    console.log("log: data emitted from WAREHOUSE id : "+id);
                    callback(err , results);
                }
                else{
                    console.log("log: error retrieving from WAREHOUSE id =" + id);
                    callback(err,results);
                }
            });
        }).catch((err) => {
            console.log("log: no WAREHOUSE table available");
        });
    }

    function _updateProductWarehouseCount(id,count,callback){
        warehouseState.then((val) => {
            database.query("update WAREHOUSE set count = ? where id = ?" , [count,id] , (err, results)=>{
                if(!err){
                    console.log("log: WAREHOUSE count changed id : "+id);
                    callback(err,results);
                }else{
                    console.log("log: WAREHOUSE could not be changed id : "+id);
                    callback(err,results);
                }
                
            });
        }).catch((err) => {
            console.log("log: no PRODUCTS table available");
        })
    }

	return {
            create:_create,
            getProductsWarehouse:_getProductsWarehouse,
            getProductWarehouse:_getProductWarehouse,
	        updateProductWarehouseCount:_updateProductWarehouseCount
    }
})();
