const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");



// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to format the timestamp on query
      get: (createdAtValue) =>
        moment(createdAtValue).format("MMM Do YYYY [at] h:mm a"),
      // return "TODO Formate The Current Date"
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create a virtual property ReactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

// TODO review to mini project student model AssignmentSchema as a reference for Thought model and reactionSchema.
