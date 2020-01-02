var express = require("express");
const router = express.Router();
var kafka = require("../Kafka/client");

router.get("/getMessages/:sender/", (req, res) => {
    let body = {
        sender: req.params.sender
    };
    kafka.make_request("messageTopics", { path: "getMessages", body }, function (
        err,
        result
    ) {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.send(result);
        }
    });
});

router.post("/postMessages", async (req, res) => {
    let body = req.body;
    kafka.make_request("messageTopics", { "path": "postMessages", "body": body }, function (
        err,
        result
    ) {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.send(result);
        }
    });
});
module.exports = router;