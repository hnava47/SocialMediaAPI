const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

function dateFormat(createdAt) {
    return moment(createdAt).format('YYYYMMDDHHmmss');
};

module.exports = reactionSchema;
