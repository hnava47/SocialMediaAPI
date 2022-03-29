const router = require('express').Router();
const {
    getAllUsers,
    getUser,
    createUser
} = require('../..//controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUser);

module.exports = router;
