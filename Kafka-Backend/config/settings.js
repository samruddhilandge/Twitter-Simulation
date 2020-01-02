'use strict';
module.exports = {
    'database_type': 'mongodb',
    'database_username': 'root',
    'database_password': 'sjsu',
    'database_host': 'localhost',
    'database_port': '27017',
    'database_name': 'twitter',
    'connection_string': 'mongodb+srv://root:root@clusterkc-cr6mm.mongodb.net/Twitter?retryWrites=true&w=majority',



    's3bucket' : 'https://twitter-g12-bucket.s3.us-east-2.amazonaws.com/',
    'frontendHostName' : 'localhost',
    'frontendPort' : 3000,

    'kafka_host': 'localhost',
    'kafka_port': '2181',

    'redis_host': 'localhost',
    'redis_port': 6379
};
