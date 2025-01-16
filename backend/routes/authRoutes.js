// const express = require('express');
// const { signUp, login } = require('../controllers/authController');

// const router = express.Router();

// router.post('/signup', signUp);
// router.post('/login', login);

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Use the correct controller

// Register User
router.post('/signup', authController.registerUser);

// Login User
router.post('/login', authController.loginUser);

module.exports = router;

