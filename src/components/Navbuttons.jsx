import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar'
import { useDispatch, useSelector } from 'react-redux'; 
import { Logout } from '../thunks/logoutThunk.js';
import ListEquipment from './ListEquipment'; 
import { updateComponentName } from '../reducers/componentReducer';

const Navbuttons = () => {
  const location = useLocation()
  const data = location.state || {}
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const LogOut = () => {
    navigate("/")
    dispatch(Logout())
  }

  function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }


  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  
  return (
    <div style={{ marginTop: '10px' }}>
  
      <div id="divTables" style={{ display: "flex", flexDirection: "column" }}>

        <table id="tblNavigation">
          <tbody>
            <tr id="trButtons">
              <td id="tdMenu"></td>
              <td>
                  <button className="myButton" id="btnUnits" name="btnUnits" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="View unit list" onClick={()=>{updateComponentName('equipment');navigate("/list_equipment")}}>Units</button>
              </td>

              <td>{localStorage.getItem("admin") == "true" ?(
                <button className="myButton" id="btnAdmin" data-placement="top" title="For admins only" onClick={()=>navigate("/admin")}>Admin</button>):null}
                </td>
              <td>
                <button id="btnGoToTasks" name="btnGoTasks" className="myButton" data-toggle="tooltip" data-placement="top" title="View tasks" onClick={()=>{dispatch(updateComponentName('tasks'));navigate("/tasks")}}>Tasks</button>
              </td>
              <td>
                <button className="myButton" id="btnFilters" name="btnfilters" data-toggle="tooltip" data-placement="top" title="Filter Inventory Control" onClick={()=>{dispatch(updateComponentName('filters'));navigate("/filters")}}>Filters</button>
              </td>
              <td>
                <button className="myButton" data-toggle="tooltip" data-placement="top" title="Log out of Filter Manager" id="btnLogOut" onClick={()=>LogOut()}>Log Out</button>
              </td><td>

                <button className="myButton" title="About this app" id="btnApp" onClick={()=>navigate("/about")}>About</button>
              </td></tr>
          </tbody>
        </table>
        <table id="tblTools" style={{ display: "none" }}>
          <tbody>
            <tr><td></td>
              <td style={{ marginTop: "10px" }}>
                  <input type="checkbox" style={{ visibility: "hidden", height: "0px", width: "0px" }} id="ckoverdue" name="ckoverdue"></input>
                </td>
                </tr>
                </tbody>
                </table>
      </div>
      <Toolbar />
    </div>
  );
};

export default Navbuttons;