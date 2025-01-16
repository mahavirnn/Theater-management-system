// const { User } = require('../models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.signUp = async (req, res) => {
//     const { theaterName, userName, mobile, password, role } = req.body;

//     console.log("Received data:", req.body); // Log request data

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const result = await pool.query(
//             `INSERT INTO users (theater_name, user_name, mobile, password, role)
//              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//             [theaterName, userName, mobile, hashedPassword, role]
//         );

//         console.log("Inserted data:", result.rows); // Log inserted data

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error("Error inserting user:", error.message); // Log any error
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ where: { user_name: username } });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign(
//             { userId: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };








// controllers/authController.js

const userService = require('../services/userService');

// Controller for creating a new user
async function registerUser(req, res) {
    try {
        const userData = req.body; // Assuming body contains theatername, username, etc.
        const newUser = await userService.createUser(userData);
        res.status(201).json({
            message: 'User created successfully!',
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller for logging in
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add password validation logic here
        if (user.password !== password) { // Use bcrypt for hashing!
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful!',
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
};
