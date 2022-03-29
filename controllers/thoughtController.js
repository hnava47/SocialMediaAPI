const { Thought } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});

            res.json(thoughts);
        } catch (error) {
            res.json(error);
        }
    }
};
