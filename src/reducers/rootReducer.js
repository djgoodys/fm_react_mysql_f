import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer.js'
import filterTypesReducer from './filterTypesReducer.js'
import listEquipmentReducer from './listEquipmentReducer'
import dataTableSlice from './refDataTableReducer'
import tasksSlice from './tasksReducer'
import filtersSlice from './filtersReducer'
import UsersSlice from '/usersReducer'

const rootReducer = combineReducers({
  userData: userLoginReducer,
  list_equipment: listEquipmentReducer,
  filter_types: filterTypesReducer,
  dataTable: dataTableSlice,
  tasks: tasksSlice,
  filters: filtersSlice,
  dataTableRef, dataTableSlice,
  users: UsersSlice
});

export default rootReducer;
