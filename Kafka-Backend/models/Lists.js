var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var ListSchema = new Schema(
  {
    listname: { type: String },
    creatorID: { type: String},
    creatorName: {type: String},
    creatorImage:{type: String},
    description: { type: String },
    mobile: { type: Number },
    memberID: { type: Array },
    subscriberID: { type: Array }
  },
  {
    collection: "Lists"
  }
);

var Lists = mongoose.model("Lists", ListSchema, "Lists");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Lists;
