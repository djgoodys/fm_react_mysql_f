import { createAsyncThunk } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(
    'userData/Login',
    async (obj) => {
        const params = new URLSearchParams({
            username: obj.username,
            password: obj.password,
            action: obj.action
        });
        const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/manageUsers?${params.toString()}`, {
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
