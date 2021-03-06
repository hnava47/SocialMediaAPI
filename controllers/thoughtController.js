const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (error) {
            res.json(error);
        }
    },
    getThoughtById: async (req, res) => {
        const { thoughtId } = req.params;

        try {
            const thought = await Thought.findById(thoughtId);

            res.json(thought);
        } catch (error) {
            res.json(error);
        }
    },
    createThought: async (req, res) => {
        const { thoughtText, username, userId } = req.body;

        try {
            const newThought = await Thought.create({
                thoughtText,
                username
            });

            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { thoughts: newThought._id } }
            );

            res.json(newThought);
        } catch (error) {
            res.json(error);
        }
    },
    updateThoughtById: async (req, res) => {
        const { thoughtId } = req.params;

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                {...req.body},
                {
                    new: true,
                    runValidators: true
                }
            );

            res.json(updatedThought);
        } catch (error) {
            res.json(error);
        }
    },
    deleteThoughtById: async (req, res) => {
        const { thoughtId } = req.params;

        try {
            const deletedThought = await Thought.findByIdAndDelete(thoughtId);

            res.json(deletedThought);
        } catch (error) {
            res.json(error);
        }
    },
    createReaction: async (req, res) => {
        const { thoughtId } = req.params;
        const { reactionBody, username} = req.body;

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $addToSet: { reactions: { reactionBody, username } } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (error) {
            res.json(error);
        }
    },
    deleteReactionByReactId: async (req, res) => {
        const { thoughtId, reactionId } = req.params;

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (error) {
            res.json(error);
        }
    }
};
