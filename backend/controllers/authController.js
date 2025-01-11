const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { theaterName, userName, mobile, password, role } = req.body;

    console.log("Received data:", req.body); // Log request data

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (theater_name, user_name, mobile, password, role)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [theaterName, userName, mobile, hashedPassword, role]
        );

        console.log("Inserted data:", result.rows); // Log inserted data

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error inserting user:", error.message); // Log any error
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { user_name: username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
