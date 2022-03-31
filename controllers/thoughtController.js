const { Thought } = require('../models');

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
        const { thoughtText, username } = req.body;

        try {
            const newThought = await Thought.create({
                thoughtText,
                username
            });

            res.json(newThought);
        } catch (error) {
            res.json(error);
        }
    }
};
