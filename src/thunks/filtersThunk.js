import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageFilters = createAsyncThunk(
    'filters/manageFilters',
    async (vars, { rejectWithValue }) => {

        const params = new URLSearchParams({
            action: vars.action,
            username: vars.username,
            id: vars.id,
            filter_type: vars.filter_type,
            filter_size: vars.filter_size,
            notes:vars.notes,
            count:vars.count,
            par:vars.par,
            storage:vars.storage,
            pn:vars.pn
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/manageFilters?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

