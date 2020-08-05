const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    created: Date,
    updated: Date,
    text: String
}, { timestamps: true });

const threadSchema = new Schema({
    topic: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    created: Date,
    updated: Date,
    text: String,
    posts: [postSchema]
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);