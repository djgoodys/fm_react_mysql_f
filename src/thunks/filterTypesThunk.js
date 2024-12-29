import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageFilterTypes= createAsyncThunk (
    'filterTypes/manageFilterTypes',
    async (vars, { rejectWithValue }) => {
      const params = new URLSearchParams({
          action: vars.action,
          id: vars.id,
          filter_type:vars.type,
          trackable:vars.trackable,
      });

      try {
          const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/manageFilterTypes?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
