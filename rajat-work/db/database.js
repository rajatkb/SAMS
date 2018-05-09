let mysql = require('mysql');
module.exports = (function(){
    let connectionConfig = {
        host     : 'localhost',
        user     : 'root',
        password : 'iamrajat',
    }
    let connection = mysql.createConnection(connectionConfig);
    connection.on('error' , function(err){
        console.log("log: fatal error occured:" , err.code);
    });
    
    let connectionState = new Promise((resolve,reject)=>{
        connection.query("create database SAMS" , function(error , results , fields){
            if(error && error.code != "ER_DB_CREATE_EXISTS") 
            { 
                console.log("log: failed to create db" , error.code);
                reject(error);
            }
            else 
            {   
                console.log("log: created SAMS succesfully if not exists");
                resolve(results);
            }
            connection.end();
        });
    });
    connectionConfig.database = 'SAMS';
    connectionConfig.max_connections = 10;
    let pool = mysql.createPool(connectionConfig);
    function _query(sql , params , callback){
        connectionState.then((results) => {
            pool.getConnection(function(err,connection){
                if(!err)
                {
                    connection.query(sql,params,function(error , results , fields){
                        if(error){
                            console.log("log: error at db/database/query "+error.message);
                            callback(null);
                        }
                        else{
                            console.log("log: query succesfull");
                            callback(results);
                        }
                        connection.release();
                    });
                }else{
                    console.log("log: error in getting connection ", err.message);
                }
            });
        }).catch((error) => {
            console.log("log: database SAMS does not exists yet");
        });
    }
    
    return{
        query: _query,
    }
})();