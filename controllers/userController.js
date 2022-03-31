const { isEmail } = require('validator');
const { User, Thought } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate([
                {
                    path: 'thoughts'
                },
                {
                    path:'friends',
                    select: '-thoughts'
                }
            ]);

            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await User.findById(userId).populate([
                {
                    path: 'thoughts'
                },
                {
                    path:'friends',
                    select: '-thoughts'
                }
            ]);

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
    updateUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {...req.body},
                {
                    new: true,
                    runValidators: true
                }
            );

            res.json(updatedUser);
        } catch (error) {
            res.json(error);
        }
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);

            deletedUser.thoughts.forEach(async (thought) => {
                await Thought.findByIdAndDelete(thought._id);
            });

            res.json(deletedUser);
        } catch (error) {
            res.json(error)
        }
    },
    addFriendToUser: async (req, res) => {
        let updatedUsers = [];
        const { userId, friendId } = req.params;

        try {
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } }
            );

            await User.findByIdAndUpdate(
                friendId,
                { $addToSet: { friends: userId } }
            );

            updatedUsers.push(await User.findById(userId).populate([
                {
                    path: 'thoughts'
                },
                {
                    path: 'friends',
                    select: '-thoughts'
                }
            ]));

            updatedUsers.push(await User.findById(friendId).populate([
                {
                    path: 'thoughts'
                },
                {
                    path: 'friends',
                    select: '-thoughts'
                }
            ]));

            res.json(updatedUsers);
        } catch (error) {
            res.json(error);
        }
    },
    deleteFriendFromUser: async (req, res) => {
        let updatedUsers = [];
        const { userId, friendId } = req.params;

        try {
            updatedUsers.push(await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            ).populate([
                {
                    path: 'thoughts'
                },
                {
                    path: 'friends',
                    select: '-thoughts'
                }
            ]));

            updatedUsers.push(await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } },
                { new: true }
            ).populate([
                {
                    path: 'thoughts'
                },
                {
                    path: 'friends',
                    select: '-thoughts'
                }
            ]));

            res.json(updatedUsers);
        } catch (error) {
            res.json(error);
        }
    }
};
