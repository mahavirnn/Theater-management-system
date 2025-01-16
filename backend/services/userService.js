// services/userService.js

const { User } = require('../models'); // Import the User model

// Create a new user
async function createUser(data) {
    const { theatername, username, mobilenumber, password, role } = data;
    try {
        const newUser = await User.create({
            theatername,
            username,
            mobilenumber,
            password, // Ensure hashing in the controller or here
            role,
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

// Find a user by username
async function findUserByUsername(username) {
    try {
        const user = await User.findOne({ where: { username } });
        return user;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
}

// Export the functions
module.exports = {
    createUser,
    findUserByUsername,
};
