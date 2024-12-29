import React, { useState, useRef, useEffect } from 'react';
import passwordhelp from '../images/passwordhelp.jpg'
import { useSelector, useDispatch } from 'react-redux';
import {Login } from '../thunks/loginThunk'
import { manageEquipment } from '../thunks/listEquipmentThunk';
import Spinner from 'react-bootstrap/Spinner';

const FrmLogin = () => {
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [serverMessage, setServerMessage] = useState('')
  const txtUserNameRef = useRef(null)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)
  const [spinner, setSpinner] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLogin = async (e) => {
    setServerMessage('')
    setSpinner(true)

    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const obj = {
          username: username, 
          password: password,
          action: 'login'
      }
      const response = await dispatch(Login(obj));

      if (response.payload.login === "passed") {
          setSpinner(false);
          dispatch(Login(response.payload));
          localStorage.setItem("admin", response.payload.admin);
          const vars = {
             action: "get-all-equipment" }
          dispatch(manageEquipment(vars));
          localStorage.setItem("loggedin", "true");
      } else {
          setServerMessage("LOGIN ATTEMPT FAILED");
          setSpinner(false);
          setIsSubmitting(false);
      }
  } catch (error) {
      console.error("Login error:", error);
      setIsSubmitting(false);
  }
  
  }
    
  useEffect(() => { 
    localStorage.setItem("userData", JSON.stringify(userData.userData))
    if (Array.isArray(userData)) { 
    } 
    else 
    { 
      } }, [userData]);


  return (
    <div style={{ marginTop:"200px",display: 'flex', flexDirection:"column", height: '100%', justifyContent:"center", alignItems:"center" }}>
      {spinner === true? (<div style={{margin:"0 auto", fontSize:"3em", color:"blue"}}>Loading...   <Spinner style={{width:"100px", height:"100px"}} animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner></div>): null}
      <div className={serverMessage !== "" ? "server-message-visible" :"server-message-hidden"} id="divServerMessage">{serverMessage}</div>
      <form id="frmLogin" style={{ width: '80%', margin: 'auto', display: 'flex' }}>
 
 
  <table id="tblLogin" style={{width: '75%', textAlign: 'center' }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  id="txtUserName"
                  ref={txtUserNameRef}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="ENTER USER NAME HERE"
                  name="username"
                  size="21"
                  maxLength="10"
                  style={{ marginRight: 'auto', marginLeft: '300px', display: 'inline-block' }}
                />
              </td>
              <td>
                <input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  name="password"
                  value={password}
                  style={{ color: 'black' }}
                  id="txtPassword"
                  autoComplete="on"
                  placeholder="ENTER PASSWORD HERE"
                />
              </td>
              <td>
                <input
                  type="button"
                  id="btnLogon"
                  className="myButton"
                  name="action"
                  value="login"
                  onClick={(event)=>submitLogin(event)}
                />
              </td>
              <td>
                <a href="login_help.php" title="Password help" target="iframe2">
                  <img
                    src={passwordhelp}
                    style={{ width: '40px', boxShadow: '4px 4px black', marginTop: '0px', height: 'auto', borderRadius: '50%' }}
                    alt="Password Help"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FrmLogin;
