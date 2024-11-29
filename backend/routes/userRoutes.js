const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/users', [auth, admin], getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;