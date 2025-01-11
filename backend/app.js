const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Import Sequelize instance
const authController = require('./controllers/authController');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/signup', authController.signUp);
app.post('/login', authController.login);

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
