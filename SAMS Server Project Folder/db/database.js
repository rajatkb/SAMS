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
                // The error object if not true will mean that
                // the connection was successfull
                if(!err)
                {
                    // the query will result error otherwise empty object
                    // if connection query fails
                    connection.query(sql,params,function(error , results , fields){
                        if(error){ // if it fails
                            console.log("log: error at db/database/query "+error.message);
                            callback(error, false);
                        }
                        else{ // if it succeed
                            console.log("log: query succesfull at db/database/query");
                            callback(false, results);
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