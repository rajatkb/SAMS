let database = require('./database');
module.exports = (function(){
    let createTableSQL =    " create table if not exists PRODUCTS ("+
                            " id varchar(30) not null,"+
                            " name varchar(30) not null,"+
                            " brand_name varchar(30) not null,"+
                            " category_name varchar(30) not null,"+
                            " description varchar(50) not null,"+
                            " price int not null,"+
                            " picture_url varchar(200) not null,"+
                            " status boolean not null,"+
                            " primary key(id) )";
    
    let productState = new Promise((resolve , reject) => {
        database.query(createTableSQL,null,(error, results) => {
            if(error){
                console.log("log: failed to create table PRODUCTS");
                reject(error);
            }
            else{
                console.log("log: created table PRODUCTS if not exists");
                resolve(results);
            }
        })
    });

    function _create(data , callback){
        let new_data={  id:data.id,
                        name:data.name, 
                        brand_name:data.brand_name, 
                        category_name:data.category_name, 
                        description:data.description, 
                        price:data.price,
                        status:data.status,
                        picture_url:data.picture_url
                    };
        productState.then((value) => {
            database.query("insert into PRODUCTS set ? ",new_data,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: PRODUCT data inserted for id : ",new_data.id);
                    callback(err,results);
                }else{
                    console.log("log: eror while inserting data into PRODUCTS table for id =",data.id);
                    callback(err,results);
                }
            });
        }).catch((error) => {
            console.log("log: no PRODUCTS table available");
        });
    }
    
    function _getProducts(callback){
        productState.then((value) => {
            database.query("select * from PRODUCTS",null,(err,results)=>{
                // error is false when the result is true
                if(!err){
                    console.log("log: PRODUCTS table emitted");
                    callback(err,results);
                }else{
                    console.log("log: error retrieving PRODUCTS table");
                    callback(err,results);
                }
            });
        }).catch((error) => {
            console.log("log: no PRODUCTS table available");
        });
    }

    function _getProduct(id,callback){
        productState.then((val) => {
            database.query("select * from PRODUCTS where id = ?" , id , (err , results) => {
                if(!err){
                    console.log("log: data emitted from PRODUCTS id : "+id);
                    callback(err , results);
                }
                else{
                    console.log("log: error retrieving from Products id =" + id);
                    callback(err,results);
                }
            });
        }).catch((err) => {
            console.log("log: no PRODUCTS table available");
        });
    }

    function _deleteProduct(id,callback){
        productState.then((val) => {
            database.query("delete from PRODUCTS where id = ?" , id , (err , results) => {
                if(!err){
                    console.log("log: data deleted from PRODUCTS id : "+id);
                    callback(err , results);
                }
                else{
                    console.log("log: error deleting from PRODUCTS id =" + id);
                    callback(err,results);
                }
            });
        }).catch((err) => {
            console.log("log: no PRODUCTS table available");
        });
    }

    function _updateProductState(id,state,callback){
        productState.then((val) => {
            database.query("update PRODUCTS set status = ? where id = ?" , [state,id] , (err, results)=>{
                if(!err){
                    console.log("log: state changed id : "+id);
                    callback(err,results);
                }else{
                    console.log("log: state could not be changed id : "+id);
                    callback(err,results);
                }
            });
        }).catch((err) => {
            console.log("log: no PRODUCTS table available");
        })
    }

    return{
        create: _create,
        getProducts:_getProducts,
        getProduct:_getProduct,
        deleteProduct:_deleteProduct,
        updateProductState:_updateProductState,
    }

})();