const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

module.exports = router;
