

import { createAsyncThunk } from '@reduxjs/toolkit';

export const Logout = createAsyncThunk(
    'userData/logout',
    async () => {
        const data = { login: "logout" };
        return data;
    }
);

