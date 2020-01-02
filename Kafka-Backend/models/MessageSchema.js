  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userDetails = require('./UserDetailsSchema')

MessageSchema = new Schema({
    user1: {
        type: userDetails.UserDetailsSchema
    },
    user2: {
        type: userDetails.UserDetailsSchema
    },
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            },
            sent: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('messages', MessageSchema); 