import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageUsers = createAsyncThunk(
    'users/manageUsers',
    async (obj) => {
        // Construct the query string
        const params = new URLSearchParams({
            username: obj.username,
            password: obj.password,
            action: obj.action,
            id: obj.id,
            admin: obj.admin,
            email: obj.email,
        });

        // Perform the GET request
        const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/api/manageUsers/?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
);
