const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',      // Replace with your PostgreSQL username
    host: 'localhost',         // Database host (use 'localhost' if running locally)
    database: 'theatre database',  // Replace with your PostgreSQL database name
    password: 'pooja1803', // Replace with your database password
    port: 5432,
});

// Signup route
app.post('/signup', async (req, res) => {
    const { theatername, username, mobilenumber, password, confirmPassword, role } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Validate mobile number format (basic validation for 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobilenumber)) {
        return res.status(400).send('Invalid mobile number format');
    }

    // Check if the username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
        return res.status(400).send('Username already exists');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await pool.query(
            'INSERT INTO users (theatername, username, mobilenumber, password, role) VALUES ($1, $2, $3, $4, $5)',
            [theatername, username, mobilenumber, hashedPassword, role]
        );

        res.status(201).send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(400).send('User not found');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        // Send success response
        res.status(200).send('Login successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
