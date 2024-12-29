import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageTasks = createAsyncThunk (
    'tasks/manageTasks',
    async (vars) =>{
        const response = await fetch(`${process.env.REACT_APP_PY_SERVER}/manageEquipment?action=${vars.action}&unit_id=${vars.unit_id}&rotation=${vars.rotation}&filter_type=${vars.filter_type}&username=${vars.username}&newtasks=${vars.task_array}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        if(!response.ok){
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    }
)
