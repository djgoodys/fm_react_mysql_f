import React, { useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setJavaCookie, getCookie, setCookie, saveScrollPosition, setScrollPosition } from '../javafunctions';
import Assignedtoo from './Assignedtoo';
import Filtersdone from './Filtersdone';
import { manageUsers } from '../thunks/usersThunk'
import { manageEquipment } from '../thunks/listEquipmentThunk'
import { manageFilterTypes } from '../thunks/filterTypesThunk'
import { updateComponentName } from '../reducers/componentReducer';
import '../css/checkboxListEquipment.css';
import '../css/fm.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const EquipmentList = () => {
    const [notes, setNotes] = useState({});
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const equipmentState = useSelector((state) => state.equipment);
    const { loading, error } = equipmentState
    let equipment=[]
    const [showNotes, setShowNotes] = useState(false)
    const [showTasks, setShowTasks] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)
    const navigate = useNavigate()
    const refDivTasks = useRef(null)
    const [filter_types, setFilterTypes] = useState([])
    const [theadTop, setTheadTop] = useState('0')
    const [checkedItems, setCheckedItems] = useState(
        equipment.reduce((acc, unit) => {
            acc[unit._id] = false;
            return acc;
        }, {})
    );

    const [count, setCount] = useState(1);

    useEffect(() => {
        if (count < 90) {
            const timer = setTimeout(() => {
                setCount(prevCount => prevCount + 1);
            }, 100); // Adjust the interval as needed (in milliseconds)
            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [count]);


    const submitTasks = () => {
        setShowTasks(false)
        const username = localStorage.getItem("username")
        const alltasks = tasks.map((task) => {
            return task.unit_id
        })
        console.log("alltasks="+alltasks)
        const obj2 = {
            action: 'add-all-tasks',
            username: username,
            task_array: alltasks
        }
        const allunits = dispatch(manageEquipment(obj2))
        navigate("/tasks")
    }

    let filterDueDate = useRef('');
    let ftypes = useSelector((state) => state.filterTypes)
    useEffect(() => {
        const obj={
            action:"get-filter-types"
        }
            dispatch(manageFilterTypes(obj)).then((response) => {
                const datax = response.payload;
                datax.forEach((item => {
                    ftypes = datax.map((item) => item.type);
                }))
                setFilterTypes(ftypes)
            }).catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);

    let allusers = useSelector((state) => state.filterTypes)
    useEffect(() => {
        const obj={
            action:"get-all-users"
        }
            dispatch(manageUsers(obj)).then((response) => {
                const datax = response.payload;
                datax.forEach((item => {
                    allusers = datax.map((item) => item.user_name);
                }))
                setUsers(allusers)
            }).catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);

    const handleNotesChange = (id, newValue) => {
        setIsDisabled(false);
        setNotes(prevNotes => ({
            ...prevNotes,
            [id]: newValue
        }));
    };

    function updateNotes(unit_id, newnotes) {
        const obj={
            unit_id:unit_id,
            notes:newnotes,
            action:'edit-unit',
            field:'notes'
        }
        dispatch(manageEquipment(obj))
        setShowNotes(false)

    }

    const toggleClass = (event, shouldToggle, tableid) => {

        event.stopPropagation();
        const tableRef = document.getElementById("tbl" + tableid);
        if (tableRef) {
            if (tableRef.classList.contains('UnitInfoClosed')) {
                tableRef.classList.remove('UnitInfoClosed');
                tableRef.classList.add('UnitInfoOpen');
            } else {
                tableRef.classList.remove('UnitInfoOpen');
                tableRef.classList.add('UnitInfoClosed');
            }
        }
    };

    const closeUnitInfo = (id) => {
        //console.log(id);
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoClosed";
        }
    }
    const showUnitInfo = (id) => {
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoOpen";
        }
        var my_disply = document.getElementById(tableID).style.display;
        setJavaCookie("cookie_infoid", id);
        if (my_disply == "none") {
            saveScrollPosition();
            document.getElementById(tableID).style.display = "block";
            setTimeout(setScrollPosition, 100);
        } else {
            setCookie("cookie_infoid", "void");
        }
    };

    const getUnitName = (id) => {
        for (const item of equipment) {
            if (item._id === id) {
                return item.unit_name;
            }
        } return null;
    };

    const handleCheckboxChange = async (event, unit_id, unit_name) => {
        const isChecked = event.target.checked;
        const unitname = getUnitName(unit_id)
        setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [unit_id]: !prevCheckedItems[unit_id], }));
        setShowTasks(true)
        isChecked ? setTheadTop("110px") : setTheadTop("0")
        let thisTask = {
            unit_id: unit_id,
            unit_name: unit_name
        }

        await setTasks((prevTasks) => {
            if (!isChecked) {
                return prevTasks.filter((task) => task.unit_id !== unit_id)
            }
            else {
                return [...prevTasks, thisTask]

            }
        })

    }

    

    useEffect(() => {
        const obj={
            action:"get-all-equipment"
        }
        dispatch(updateComponentName('equipment'))
        dispatch(manageEquipment(obj));
    }, []);

   
    equipment = useSelector((state) => state.equipment.equipment);

    const isDateOlderThanToday = (filtersDue) => {
        const today = new Date();
        const filterDate = new Date(filtersDue);
        return filterDate < today;
    }

    //The function below was needed because the remote server returns the wrong Date format even though when viewed through PHPmyAdmin it show Y-m-d
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', options); 
      }

    const renderTableRows = () => {
        const rows = [];
        for (let i = 0; i < equipment.length; i++) {
            const item = equipment[i];
            let x = "notoverdue";
            if (isDateOlderThanToday(item.filters_due)) {
                x = "overdue";
            } else {
                x = "notoverdue";
            }
            let task_id = "cktask" + item._id;
            filterDueDate = formatDate(item.filters_due)
            rows.push(
                <tr key={item._id} className={x} >
                    <td>
                        {item.assigned_to !== "" ? (
                            <Assignedtoo assignedUsername={item.assigned_to} unit_id={item._id} users={users} />
                        ) : (
                            <label className="container">
                                <input type="checkbox" className="checkmarkListEquipment" id={item.unit_id} value="" onChange={(event) => handleCheckboxChange(event, item._id, item.unit_name)} checked={checkedItems[item._id] || false} />
                                <span className="checkmark"></span>
                            </label>
                        )}
                    </td>
                    <td>
                        <Filtersdone unit_id={item._id} rotation={item.filter_rotation} filter_types={filter_types} />
                    </td>
                    <td><p onClick={(event) => toggleClass(event, true, item._id)}>{item.unit_name}</p>
                    </td>
                    <table className='UnitInfoClosed' id={`tbl${item._id}`}>
                        <tr><td align="left">{item.unit_name}</td>
                            <td><button className='DatatableUnitInfoCloseButton' title={'Close info ' + item.unit_name} onClick={(event) => toggleClass(event, true, item._id)}>Close</button></td></tr>
                        <tr><td>Location</td><td>{item.location}</td></tr>
                        <tr><td>Area Served</td><td>{item.area_served}</td></tr>
                        <tr><td>Filter Size</td><td>{item.filter_size}</td></tr>
                        <tr><td>Filter Type</td><td>{item.filter_type}</td></tr>
                        <tr><td>Filter Due Date</td><td>{filterDueDate}</td></tr>
                        <tr><td>Filters Last replaced</td><td>{item.filters_last_changed}</td></tr>
                        <tr><td>Filter Rotation</td><td>{item.filter_rotation}</td></tr>
                        <tr>
                            <td>Belts</td>
                            <td>{item.belts}</td>
                        </tr>
                        <tr key={item._id}>
                            <td>Notes</td>
                            <td>
                                <textarea key={item._id} readOnly={isDisabled} className="notes" onClick={() => {setShowNotes(true);setIsDisabled(!isDisabled)}} onChange={(event) => handleNotesChange(i, event.target.value)} value={notes[i] || ''} ></textarea><br />
                                <button type="button" onClick={() => { updateNotes(item._id, notes[i]) }} style={{display: showNotes ? "block": "none"}}>update</button>
                        </td>
                        </tr>
                        <tr>
                            <td>Assigned Too</td>
                            <td>{item.assigned_to}</td>
                        </tr>
                    </table>
                    <td>{item.location}</td>
                    <td>{item.area_served}</td>
                    <td>{item.filter_size}</td>
                    <td>{filterDueDate}</td>
                </tr>
            );
        }
        return rows;
    }

    return (
        <div style={{display:"flex",flexDirection:"column", alignContent:"center", alignItems:"center"}}>
            <a>showing {equipment.length} records</a>
            {loading && <><span>Stand by. Retrieving data... This may take up to 60 seconds...{count}</span><Spinner style={{width:"20px", height:"20px", display:Object.keys(equipment).length > 0 ? "none":"block"}} animation="border" variant="primary" role="status">
                <span ></span>
            </Spinner></>}
            <div id="divTasks" ref={refDivTasks} style={{ display: showTasks && tasks.length > 0 ? "grid" : "none", gridTemplateColumns:"1fr 1fr" }}>
                
            <div style={{display:"flex"}}>
                {tasks.map((task) => (

                <p key={task.task_id} style={{padding:"15px"}}>{task.unit_name}</p>

            ))
            }
               </div>
                <div style={{display:"flex", marginLeft:"0px"}}>
                    <Button variant="success" style={{ height: "80px", paddingBottom:"10px" , width:"140px"}} onClick={() => submitTasks()}>Submit tasks</Button>
                    <Button variant="secondary" style={{ height: "80px", width:"140px", marginLeft:"20px",color:"white" }} onClick={() => setShowTasks(false)}>Cancel</Button>
                </div>
            </div>
            <table id="tblListEquipment">
                <thead style={{ top: theadTop, position: "sticky", zIndex: "2" }}>
                    <tr>
                        <th>TASKS</th>
                        <th>FILTERS DONE</th>
                        <th style={{ textAlign: "center" }}>UNIT NAME</th>
                        <th>LOCATION</th>
                        <th>AREA SERVED</th>
                        <th>FILTER SIZE</th>
                        <th>DUE</th>
                    </tr>
                </thead>
                <tbody> {renderTableRows()}</tbody>
            </table>
        </div>
    );
};

export default EquipmentList;
