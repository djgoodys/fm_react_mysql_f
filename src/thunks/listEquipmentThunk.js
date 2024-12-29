import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageEquipment = createAsyncThunk(
    'equipment/manageEquipment',
    async (vars, { rejectWithValue }) => {
        const params = new URLSearchParams({
            action: vars.action,
            unit_id: vars.unit_id,
            rotation: vars.rotation,
            filter_type: vars.filter_type,
            username: vars.username,
            searchwords: vars.searchwords,
            sortby: vars.sortby,
            notes: vars.notes,
            field: vars.field,
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/manageEquipment?${params.toString()}&newtasks=${vars.task_array}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(`ERROR FROM listEquipmentThunk, ${error.message}`);
        }
    }
);
