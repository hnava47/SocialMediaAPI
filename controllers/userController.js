const { isEmail } = require('validator');
const { User } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await User.findById(userId).populate('thoughts friends');

            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },
    createUser: async (req, res) => {
        const { username, email } = req.body;

        if (!isEmail(email)) {
            return res.status(401).json({ error: 'Email must be a valid email address' })
        }

        try {
            const newUser = await User.create({
                username,
                email
            });

            res.json(newUser);
        } catch (error) {
            res.json(error);
        }
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);

            res.json(deletedUser);
        } catch (error) {
            res.json(error)
        }
    }
};
