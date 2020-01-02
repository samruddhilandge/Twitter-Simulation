var message = require("../models/MessageSchema");
var { userDetails } = require("../models/UserDetailsSchema")
var Users = require("../models/UserSchema")
exports.messageService = function messageService(msg, callback) {
    console.log("msg", msg);
    console.log("In Property Service path:", msg.path);
    switch (msg.path) {
        case "getMessages":
            getMessages(msg, callback);
            break;
        case "postMessages":
            postMessages(msg, callback);
            break;
    }
};


async function getMessages(msg, callback) {
    console.log(msg);
    try {
        await message.find(
            {
                $or: [
                    { 'user1.username': msg.body.sender },
                    { 'user2.username': msg.body.sender }
                ]
            }, (err, result) => {
                if (err) {
                    callback(null, {
                        status: 400,
                        message: err.message
                    });
                }
                callback(null, result);
            });
    } catch (error) {
        callback(null, {
            status: 400,
            message: error.message
        });
    }
}

async function postMessages(msg, callback) {
    console.log(msg);
    try {
        let time = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        // await message.find({}, (err, result) => {
        //     console.log("result" + result);
        //     callback(null, result);
        // })
        await message.find(
            {
                $or: [
                    { $and: [{ 'user1.username': msg.body.senderId }, { 'user2.username': msg.body.recieverId }] },
                    { $and: [{ 'user2.username': msg.body.senderId }, { 'user1.username': msg.body.recieverId }] }
                ]
            }, async (err, result) => {
                if (err) {
                    callback(null, {
                        status: 400,
                        message: err
                    });
                }
                if (result.length === 1) {
                    let updatedMessages = result[0].messages;
                    updatedMessages.push({
                        message: msg.body.message,
                        time: time,
                        sent: msg.body.sent
                    });
                    console.log(updatedMessages);
                    message.updateOne(
                        { user1: result[0].user1 },
                        { messages: updatedMessages },
                        (err, result) => {
                            if (err) {
                                callback(null, {
                                    status: 400,
                                    message: err.message
                                });
                            }
                            callback(null, result);
                        }
                    );
                } else {
                    let user1;
                    let user2;
                    await Users.findOne({ username: msg.body.senderId }, async (error, result) => {
                        user1 = new userDetails({
                            username: result.username,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            image: result.profilePicture
                        })
                        console.log(user1)
                        await Users.findOne({ username: msg.body.recieverId }, async (error, result) => {
                            user2 = new userDetails({
                                username: result.username,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                image: result.profilePicture
                            })
                            console.log(user2)

                            let newMessage = new message({
                                user1: user1,
                                user2: user2,
                                messages: [
                                    {
                                        message: msg.body.message,
                                        time: time,
                                        sent: msg.body.sent
                                    }
                                ]
                            });
                            newMessage.save((err, result) => {
                                if (err) {
                                    callback(null, {
                                        status: 400,
                                        message: err.message
                                    });
                                }
                                callback(null, result);
                            });
                        })
                    })
                }
            });
    } catch (error) {
        callback(null, {
            status: 400,
            error: error
        });
    }
}