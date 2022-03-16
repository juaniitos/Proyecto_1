const MessageSchema = new mongoose.Schema({
    message: String,
    sentBy: {type: mongoose.Schema.objectId, ref: "User"},
    seenBy: [{ user: {type: mongoose.Schema.objectId, ref: "User"}, seen: Boolean }],
    numberOfMessage: Number
})

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;