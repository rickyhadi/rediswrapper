var redismodule = require('redis');

function redis(redisConfig) {

	var client = redismodule.createClient({
		host: redisConfig.RedisHost, 
		port: redisConfig.RedisPort, 
		prefix: redisConfig.RedisPrefix
	});
	client.on('error', function (err) {
		console.log('Error ' + err);
	});
	
    var obj = {};
    obj.get = async function get(key) {
        return await new Promise(function(resolve,reject){
            client.get(key, function(e,r){
                if(e){
                    reject(e);
                }
                
                resolve(r);
            });
        });
    };
    obj.set = function set(key, value, ex) {
        if(ex){
            client.set(key, value, 'EX', ex);
        }
        else{
            client.set(key, value);
        }
    };
    obj.del = function del(key) {
        client.del(key);
    }
    return obj;
}

module.exports = redis;