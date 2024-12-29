import React, { useRef, useState } from 'react'
import {useDispatch} from 'react-redux'
import { manageEquipment } from '../thunks/listEquipmentThunk';
const Assignedtoo = ({assignedUsername ="", unit_id = "no unit id", users = []}) => {
    const [showList, setShowList] = useState(false);
    const [username, setUsername] = useState(assignedUsername);
    const [showAssigned, setShowAssigned] = useState(true)
    const refAssigned_too = useRef()
    const dispatch = useDispatch()
    const showUsers = async () => {
          setShowAssigned(false)
          setShowList(true);
          };
 
  
          const changeAssignedTo = (e, user, unit_id) => { 
            setUsername(user)
            const cell = e.target.closest('td');
            if (cell) { 
              cell.innerText = e.target.value;
            }
            setShowList(false)
            const obj = { 
              action: "assigned_too", 
              unit_id: unit_id, 
              username: user 
            }
              const ret = dispatch(manageEquipment(obj))
              .then((response) => {
                //console.log("data = "+response.payload.equipment); 
              })
              .then(data => { 
                console.log("FROM DATATABLE "+data["equipment"][0]);
                //data = data
              })
              .catch((error) => {
                console.error('Fetch error:', error); // Handle any errors
              })
            }

        return (
        <div style={{textAlign: 'center'}} ref={refAssigned_too}>
            <a style={{display: showAssigned ? "block":"none"}} onClick={()=>{showUsers()}}>{username}</a>
              
                <select style={{display:showList ? "block":"none"}} onChange={(event) => changeAssignedTo(event, event.target.value, unit_id)} name="assigned_too" ref={refAssigned_too } value={username}>
                <option key={'000'} value="" disabled>select</option>
                  {users.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                  ))}
                </select>
              
          </div>
    )
}

export default Assignedtoo