var pool = require('./pool');
module.exports = {
    init: function() {
        pool.query("create table products (id varchar(30), name varchar(30), brand_name varchar(30), category_name varchar(30), description varchar(50), price int, primary key(id) )",function(err){
            if(!err){
                console.log("table products created");
            }
            else{
                console.log("log: eror while creating table ",err);
            }

          
          });
    },
    create: function(data){
        
        var new_data={id:data.id,name:data.name, brand_name:data.brand_name, category_name:data.category_name, description:data.description, price:data.price};

        pool.query("insert into products set ? ",new_data, function(err){
            if(!err){
                console.log("data inserted for id : ",new_data.id);
            }
            else{
                console.log("log: eror while inserting data into table for id =",data.id);
                console.log(err);
            }

          
          });
    },
    delete: function(id){
        pool.query("update products set status=false where id=?",id, function(err){
            if(!err){
                console.log("data deleted for id : ",new_data.id);
            }
            else{
                console.log("log: eror while deleting data into table for id = ",data.id);
                console.log(err);
            }

          
          });
    },
    get_all_products: function(req,res){
        pool.query("select * from products", function(err,rows){
            if(!err){
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
                res.end();
                console.log("details sent of all products");
            }
            else{
                console.log("log: eror while fetching products table");
                console.log(err);
            }

          
          });
    },
    get_product_id_details: function(req,res,id){
        pool.query("select * from products where id = ?",id , function(err,rows){
            if(!err){
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
                res.end();
                console.log("details sent od id ",id);

            }
            else{
                console.log("log: eror while fetching products table for id =?",id);
                console.log(err);
            }

          
          });
    }
};
   

