var mysql = require('mysql');
// Initialize pool
var db_config      =  {
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Meghali01/12',
    database: 'sams'
    
};    
var pool = mysql.createPool(db_config);

var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }
            /*else{
                console.log("connection established");
                connection.query("create database if not exists sams",function(err){
                    if(!err){
                        console.log("database created sams");
                        db_config.database= 'sams';
                        console.log(db_config);
                    }
                    else{
                        console.log("log: error while creating database",err);
                    }
                });
            }*/

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;