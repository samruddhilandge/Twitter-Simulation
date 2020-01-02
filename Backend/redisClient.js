const redis = require('redis');
const config = require('./Config/settings.js');
//let redisClient = null;

/*let RedisClustr = require('redis-clustr');
let RedisClient = require('redis');
let redis = new RedisClustr({
  servers : [
    {
      host : config.redis_host,
      port : config.redis_port
    }
  ],
  createClient : function(port, host){
    return RedisClient.createClient(port, host);
  }
});*/

/*redis.on('connect', function(){
  console.log('connected');
});*/
console.log("In redis file")
redisClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.on('connect', function (err) {
  if(err){
    console.log("Error occured while connecting to redis server")
  }else{
    console.log('connected to Redis!!');
  }
});
redisClient.on('error', function(err){
  if(err){
    console.log(err);
  }
});

module.exports = {
  redisClient
};