const API_URL = 'http://localhost:5000'; 

// Function to create a user
export async function createUser(userData) {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create user');
        }

        return await response.json(); // Return success response
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
}
