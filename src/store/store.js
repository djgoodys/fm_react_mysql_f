import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import equipmentReducer from '../reducers/equipmentSlice';
import { filterTypesReducer } from '../reducers/filterTypesSlice';
import { tasksReducer } from '../reducers/tasksSlice';
import loggingMiddleware from '../loggingMiddleware';
import userLoginSliceReducer from '../reducers/userLoginReducer';
import usersReducer from '../reducers/usersReducer.js'
import filtersSlice from '../reducers/filtersReducer'
import componentSlice from '../reducers/componentReducer'

const store = configureStore({
    reducer: {
        equipment: equipmentReducer,
        component:componentSlice,
        filterTypes: filterTypesReducer,
        tasks: tasksReducer,
        loggedIn: userLoginSliceReducer,
        userData: userLoginSliceReducer,
        users: usersReducer,
        filters:filtersSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, loggingMiddleware),
});

export default store;

