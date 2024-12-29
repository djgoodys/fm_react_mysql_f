import { createSlice } from '@reduxjs/toolkit';

const componentSlice = createSlice({
    name: 'component',
    initialState: {
        currentComponent: '',
    },
    reducers: {
        updateComponentName: (state, action) => {
            state.currentComponent = action.payload;
        },
    },
});

export const { updateComponentName } = componentSlice.actions;
export default componentSlice.reducer;
