let database = require('./database');
module.exports = (function(){
    let createTableSQL =    " create table if not exists PRODUCTS ("+
                            " id varchar(30) not null,"+
                            " name varchar(30) not null,"+
                            " brand_name varchar(30) not null,"+
                            " category_name varchar(30) not null,"+
                            " description varchar(50) not null,"+
                            " price int not null,"+
                            " status boolean not null,"+
                            " primary key(id) )";
    
    let productState = new Promise((resolve , reject) => {
        database.query(createTableSQL,null,(value) => {
            if(!value){
                console.log("log: failed to create table PRODUCTS");
                reject(value);
            }
            else{
                console.log("log: created table PRODUCTS if not exists");
                resolve(value);
            }
        })
    });

    function _create(data){
        let new_data={  id:data.id,
                        name:data.name, 
                        brand_name:data.brand_name, 
                        category_name:data.category_name, 
                        description:data.description, 
                        price:data.price,
                        status:data.status
                    };
        productState.then((value) => {
            database.query("insert into PRODUCTS set ? ",new_data,(val)=>{
                if(!value){
                    console.log("log: eror while inserting data into table for id =",data.id);
                }else{
                    console.log("log: data inserted for id : ",new_data.id);
                }
            });
        }).catch((value) => {
            console.log("log: no PRODUCTS table available");
        });
    }
    
    return{
        create: _create,
    }

})();