
import React, { useState, useRef } from 'react';
import DivAdmin from './DivAdmin';
import passwordhelp from '../images/passwordhelp2.png';
import Toolbar from './Toolbar';
import { useDispatch, useSelector  } from 'react-redux';
import FrmLogin from './FrmLogin'
import ListEquipment from './ListEquipment'
import Navbuttons from './Navbuttons';


const TblLogin = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noUsers, setNoUsers] = useState(false);
  const txtUserNameRef = useRef(null);
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.loggedIn);
  const loggedIn = userData.loggedIn

  return (
    <div>
        {loggedIn ? (
        <><Navbuttons /><ListEquipment /></>
        ):( <FrmLogin />)}
            
    </div>
  )
}
export default TblLogin;
