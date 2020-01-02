mongoose = require('mongoose');
var Schema = mongoose.Schema;

UserDetailsSchema = new Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
});
var userDetails = mongoose.model("userDetails", UserDetailsSchema);
module.exports = { userDetails, UserDetailsSchema }; 