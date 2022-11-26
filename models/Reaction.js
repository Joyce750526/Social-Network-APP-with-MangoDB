const { Schema, Types } = require('mongoose');
const moment = require('moment');

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId(),
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       maxlength: 280,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       // Getter to format the timestamp on query
//       get: createdAtValue => moment(createdAtValue).format("MMM Do YYYY [at] h:mm a"),
//       // return "TODO Formate The Current Date"
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//     id: false,
//   }
// );

module.exports = reactionSchema;
