const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendToUser,
    deleteFriendFromUser
} = require('../../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router.route('/:userId/friends/:friendId')
    .post(addFriendToUser)
    .delete(deleteFriendFromUser);

module.exports = router;
