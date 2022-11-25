const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  // Get all thought
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought, no ID needed.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : Thought.findOneAndRemove(
            { thought: req.params.thoughtId },
            { $pull: { users: req.params.thoughtId } },
            { new: true }
          )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : Thought.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { users: req.params.thoughtId } },
            { new: true }
          )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      // Look for the thought ID
      { _id: req.params.thoughtId },
      // Add the reaction to that thought
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
 
  // delete a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      // Look for the thought ID
      { _id: req.params.thoughtId },
      // Remove the reaction based on the selected reaction ID
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : reactions.deleteOne({ _id: { $in: req.params.reactionId } })
      )
      .then(() => res.json({ message: "Reaction deleted!" }))
      .catch((err) => res.status(500).json(err)); // I keep getting this error, but the reaction deletes correctly
  },
};




  // These will eventually become "Add Friends" and "Remove Friend" Functions
  //   // Add an assignment to a student
  //   addAssignment(req, res) {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
  //   // Remove assignment from a student
  //   removeAssignment(req, res) {
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
};
