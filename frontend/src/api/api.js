const BASE_URL = process.env.REACT_APP_API;

export const fetchNotes = async () => {
    const response = await fetch(`${BASE_URL}/notes`);
    return response.json();
};

export const createNote = async (note) => {
    const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(note),
    });
    return response.json();
};

export const updateNote = async (id, updatedNote) => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedNote),
    });
    return response.json();
};

export const deleteNote = async (id) => {
    await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
};

export const archiveNote = async (id) => {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'PATCH',
    });
    return response.json();
};
export const fetchActiveNotes = async (userId) => {
    const response = await fetch(`${BASE_URL}/notes/active/${userId}`);
    console.log(response)
    return response.json();
};

export const fetchArchivedNotes = async (userId) => {
    const response = await fetch(`${BASE_URL}/notes/archived/${userId}`);
    return response.json();
};
export const addCategoryToNote = async (id, categoryId) => {
    const response = await fetch(`${BASE_URL}/notes/${id}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId }),
    });
    return response.json();
};

export const removeCategoryFromNote = async (id, categoryId) => {
    await fetch(`${BASE_URL}/notes/${id}/categories/${categoryId}`, {
        method: 'DELETE',
    });
};
export const fetchNotesByCategory = async (categoryId, userId) => {
    const response = await fetch(`${BASE_URL}/notes/user/${userId}/categories/${categoryId}`);
    return response.json();
};

export const fetchNotesByUser = async (userId) => {
    // console.log(userId)
    try {
        const response = await fetch(`${BASE_URL}/notes/user/${userId}`);
        return response.json();
    } catch (error) {
        console.log(error)
    }
}

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    return response.json();
}

export const createCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    return response.json();
};

export const updateCategory = async (id, updatedCategory) => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
    });
    return response.json();
};

export const deleteCategory = async (id) => {
    await fetch(`${BASE_URL}/categories/${id}`, { method: 'DELETE' });
};

// Auth routes
export const setAuthToken = (token) => {
    if (token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem('token', token);
    } else {
        // Remove the token when logging out
        localStorage.removeItem('token');
    }
};


export const login = async (credentials) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'User not found');
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return response.json(); // Parse and return the user data
};


export const getUser = async () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`${BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`, // Include token in the Authorization header
        },
    });

    if (!response.ok) {
        throw new Error('User profile not found');
    }

    return response.json(); // Return the user data
};

export const createUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const removeAuthToken = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
}