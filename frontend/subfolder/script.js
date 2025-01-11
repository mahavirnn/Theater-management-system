// const API_BASE = 'http://localhost:5000/api/auth';

// document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const theaterName = document.getElementById('theater-name').value;
//     const userName = document.getElementById('user-name').value;
//     const mobile = document.getElementById('mobile').value;
//     const password = document.getElementById('password').value;
//     const role = document.getElementById('role').value;

//     const response = await fetch(`${API_BASE}/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ theaterName, userName, mobile, password, role }),
//     });

//     const data = await response.json();
//     alert(data.message);
// });

// document.getElementById('login-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const userName = document.getElementById('login-user-name').value;
//     const password = document.getElementById('login-password').value;

//     const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userName, password }),
//     });

//     const data = await response.json();
//     if (data.token) {
//         alert('Login successful');
//         // Handle token (e.g., save to localStorage)
//     } else {
//         alert(data.error);
//     }
// });





import { createUser } from './apiController.js'; // Ensure this is correctly linked to your controller file

// Sign-Up Form Submission
document.getElementById('sign-up-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const theaterName = document.getElementById('theater-name').value;
    const userName = document.getElementById('user-name').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Create user data object
    const userData = { theaterName, userName, mobile, password, role };

    try {
        // Call the API through the controller
        const result = await createUser(userData);
        alert(result.message); // Display success message
    } catch (error) {
        console.error(error);
        alert('An error occurred during sign-up: ' + error.message);
    }
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const username = document.getElementById('login-user-name').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        alert(await res.text());
    } catch (err) {
        console.error(err);
        alert('An error occurred during login.');
    }
});
