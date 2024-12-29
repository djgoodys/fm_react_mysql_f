import React, { useEffect, useState, useRef } from 'react';
import Search from './Search.jsx';
//import { toggleNavigation, isMobileDevice, ckifloggedin, closeNav, openNav, logout, ckOverLay } from '../listEquipmentFunctions.js';
import { manageEquipment } from '../thunks/listEquipmentThunk';
import Imgprint from '../images/print3.png';
import Bydate from './Bydate.jsx';
import { useSelector, useDispatch } from 'react-redux'
import Sticky from 'react-stickynode';
import { useNavigate } from 'react-router-dom';

const Toolbar = () => {
  const [divOverdueClassName, setDivOverdueClassName] = useState('divOverdue');
  const [serverResponse, setServerResponse ] = useState('');
  const dispatch = useDispatch()
  const refDivOverdue = useRef(null)
  const reftxtOverdue = useRef(null)
  const [isOverdue, setIsOverdue] = useState('unchecked')
  const userName = localStorage.getItem('username');
  const [overDue, setOverDue] = useState(false)
  const navigate = useNavigate()
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  function getOverDue(){
     let action=""
    switch(reftxtOverdue.current.value){
      case  "unchecked":
      setIsOverdue("checked")
      action ='sort'
      break
      case "checked":
      setIsOverdue("unchecked")
      action = 'get-all-equipment'
      break
      default:
      setIsOverdue("unchecked")

    }

    const obj = {
      action:action,
      sortby:"OVERDUE"
    }
  
    dispatch(manageEquipment(obj))
 
  }

  return (
    <div>
      <div id="divServerResponse" cols="8" style={{ width: '100%', height: '200px', visibility: 'visible', display: 'none', backgroundColor: 'green', fontSize: '1.5rem', color: 'white', fontWeight: 'bold', overflow: 'scroll' }}>
        {serverResponse}
      </div>
      <div id='tblTools' className="Toolbar">
        <div id="menuTools" >
        </div>
        <div>
          <input type="text" ref={reftxtOverdue} style={{display:'none'}} onChange={(event)=>setIsOverdue(event.target.value)} value={isOverdue} />
          <div
            id="divOverdue"
            ref={refDivOverdue}
            className={isOverdue == "unchecked" ? 'divOverdue':'divOverdueChecked'}
            onClick={() => 
              getOverDue()
            }
          >
            Over<br />Due
          </div>
        </div>

        <div style={{ paddingTop: '0px', verticalAlign: 'top', height: 'auto' }}>
          
            <span className="input-group-text border-0 flex-nowrap" id="search-addon" style={{ verticalAlign: 'top', width: '220px', marginTop: '8px' }}>
              <Search />
             
            </span>
        </div>
        <div>
          <i className="fas fa-search"></i>
          <div id="divOutOfStock" style={{ border: ' 3px solid green', margin: '10px 10px', width: 'fit-content', height: '70px', boxShadow: ' 4px 4px black', padding: '0px, 5px' }}>
            <div style={{ whiteSpace: 'nowrap', backgroundColor: 'orange', fontSize: 'clamp(min-size, calc(100% - padding), 1.25em)', color: 'white', height: '33px', padding: '3px', fontWeight: 'bold', textAlign: 'center' }}>
              out of stock
            </div>
            <div style={{ backgroundColor: 'red', whiteSpace: ' nowrap', fontSize: 'clamp(min-size, calc(100% - padding), 1.25em)', color: 'white', textAlign: 'center', height: '33px', padding: '3px', fontWeight: 'bold', textAlign: 'center' }}>
              over due
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', boxShadow: ' 3px 3px black', borderRadius: '50%', textAlign: 'center', alignItems:"center", backgroundColor: '#97D09D', color: 'black', fontWeight: 'bold', fontSize: '1em', height: '50px', border: '3px solid green', width: '45px' }} >{userName} 
 
        </div>
        <div style={{ margin: '23px 0 0 10px' }}>
          <img src={Imgprint} onClick={()=>navigate("/print")} title="print unit list" style={{ border: '3px solid green', height: '50px', borderRadius: '50%', cursor:"pointer", boxShadow: ' 4px 4px black', }} />
        </div>
        <div>
          </div>
        <Bydate />
      </div>
    </div>
  )
}

export default Toolbar;