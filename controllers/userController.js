const { isEmail } = require('validator');
const { User } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },
    getUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await User.find({userId}).populate(
                {
                    path:'thoughts'
                },
                {
                    path: 'friends'
                }
            );

            res.json(user);
        } catch (error) {
            res.json(error);
        }
    }
};
