const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById
} = require('../../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .delete(deleteUserById);

module.exports = router;
