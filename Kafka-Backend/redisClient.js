const redis = require('redis');
const config = require('./config/settings.js');
let redisClient = null;
redisClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.on('connect', function (err) {
  if(err){
    console.log("Error occured while connecting to redis server")
  }else{
    console.log('connected to Redis!!');
  }
});
module.exports = {
    redisClient
};