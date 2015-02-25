var generic_pool = require('generic-pool');
var mysql = require('mysql');
var pool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
                var config = {
                    host: '54.64.150.217' , 
                    port: '3306' , 
                    user: 'root' ,
                    password: 'foxya.!' ,
                    database: 'yedadong'
                };
                var client = mysql.createConnection(config);
                client.connect(function (error){
                  if(error){
                    console.log(error);
                  }
                  callback(error, client);
                });
        },
        destroy: function(client) {
          client.end();
        },
        min: 3,
        max: 1000,
        idleTimeoutMillis : 30000,
        log : false
});
 
process.on("exit", function() {
  pool.drain(function () {
    pool.destroyAllNow();
  });
});
 
 
module.exports = pool;