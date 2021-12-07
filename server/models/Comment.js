const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    time: {
        type: Date,
        default: Date.now,
    },
    // commentor://link to commentors id
    
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports= Comment