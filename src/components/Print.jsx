import React, { useRef, useEffect, useState } from 'react'
import { useReactToPrint, ReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { manageEquipment } from '../thunks/listEquipmentThunk.js';
import { manageFilters } from '../thunks/filtersThunk.js';
import { manageTasks } from '../thunks/tasksThunk.js';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';


const Print = () => {
    const taskRef = useRef(null);
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const componentToPrint = useSelector((state) => state.component);
    const equipmentRef = useRef(null);
    const filtersRef = useRef();
    const [fontsize, setFontSize] = useState('.5rem');
    const [ ac_filters, setFilters ] = useState([]);
    const [ac_units, setUnits] = useState([]);
    const currentComponent = useSelector((state) => state.component);

    function formatFilters(myString) {
        const openParenCount = myString.split(')').length - 1;
   
        if (openParenCount === 1) {
            return [myString];
        } else if (openParenCount === 2) {
            const firstIndex = myString.indexOf('(', myString.indexOf('(') + 1);
            return [myString.slice(0, firstIndex), myString.slice(firstIndex)];
        }
        return [myString]; // For cases with more than 2 '('
    }
    


    const printFilters = useReactToPrint({ 
        contentRef:filtersRef,
        pageStyle: () => `
            size: A4 portrait;
            margin: 0.25in;
            -webkit-print-color-adjust: exact;
        `
    });

    const printEquipment = useReactToPrint({ 
        contentRef:equipmentRef,
        pageStyle: () => `
            size: A4 portrait;
            margin: 0.25in;
            -webkit-print-color-adjust: exact;
        `
    });

    const printTasks = useReactToPrint({ 
        contentRef:taskRef,
        pageStyle: () => `
            size: A4 portrait;
            margin: 0.25in;
            -webkit-print-color-adjust: exact;
        `
    });

    const printContent = () => {
        switch(componentToPrint.currentComponent) {
        case "equipment":
            printEquipment()
        break

        case "filters":
        printFilters()
        break

        case "tasks":
        printTasks()
        break
        }
    }
    const dispatch = useDispatch()
    const backup_folder = localStorage.getItem("backup_folder")

    const isDateOlderThanToday = (filtersDue) => {
        const today = new Date();
        const filterDate = new Date(filtersDue);
        return filterDate < today;
    }

    const obj2 = {
        backup_folder: backup_folder,
        action: "get-all-equipment"
    }

    useEffect(() => {
        if(componentToPrint.currentComponent === "equipment") {

        dispatch(manageEquipment(obj2))
            .then(response => {
                setUnits(response.payload)
                //console.log("response:", response.payload)
            }
            )
            .then()
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, []);

    useEffect(() => {
    if(componentToPrint.currentComponent === "filters") {
        const obj = {
            backup_folder: backup_folder,
            action: "get-all-filters"
        }
        dispatch(manageFilters(obj))
        
        .then(response => {
            setFilters(response.payload)
           
        }
        )
        .then()
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
},[]);

useEffect(() => {
    if(componentToPrint.currentComponent === "tasks") {
        const obj = {
            backup_folder: backup_folder,
            action: "get_all_tasks",
            username: localStorage.getItem("username")
        }
        dispatch(manageEquipment(obj))
        
        .then(response => {
            setTasks(response.payload)
           
        }
        )
        .then()
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }
},[]);

    const renderEquipmentRows = () => {
        const rows = [];
        for (let i = 0; i < ac_units.length - 1; i++) {
            const item = ac_units[i];
            let x = "notoverdue";
            if (isDateOlderThanToday(item.filters_due)) {
                x = "overdue";
            } else {
                x = "notoverdue";
            }
            let task_id = "cktask" + item._id;
            let filterDueDate = item.filters_due;
            const filters = formatFilters(item.filter_size);
            rows.push(
                <tr style={{color:isDateOlderThanToday(item.filters_due) ? "red":"black", border:"1px solid black", fontSize:fontsize}} key={item._id}>
                    <td style={{padding:'0 5px'}}>{item.unit_name}</td>
                    <td style={{padding:'0 5px'}}>{item.location}</td>
                    <td style={{padding:'0 5px'}}>{item.area_served}</td>
                    <td style={{padding:'0 5px'}}>{filters[0]}<br />{filters[1]}</td>
                    <td style={{padding:'0 5px'}}>{filterDueDate}</td>
                </tr>
            );
        }
        return rows;
    }

    const renderFilterRows = () => {
        const rows = []; // Initialize the rows array
    
        Object.keys(ac_filters).forEach(item => {
                
            rows.push(
                <tr
                    style={{
                        color: isDateOlderThanToday(item.filters_due) ? "red" : "black",
                        border: "1px solid black",
                        fontSize: fontsize
                    }}
                    key={item._id}
                >
                    <td style={{padding:'0 5px'}}>{ac_filters[item].filter_size}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].filter_type}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].par}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].filter_count}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].storage}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].notes}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].date_updated}</td>
                    <td style={{padding:'0 5px'}}>{ac_filters[item].pn}</td>
                </tr>
            );
        });
    
        return rows;
    };
    
    const renderTaskRows = () => {
        const rows = []; // Initialize the rows array
    
        Object.keys(tasks).forEach(item => {
                
            rows.push(
                <tr
                    style={{
                        color: isDateOlderThanToday(item.filters_due) ? "red" : "black",
                        border: "1px solid black",
                        fontSize: fontsize
                    }}
                    key={item._id}
                >
                    <td style={{padding:'0 5px'}}>{tasks[item].unit_name}</td>
                    <td style={{padding:'0 5px'}}>{tasks[item].location}</td>
                    <td style={{padding:'0 5px'}}>{tasks[item].filter_size}</td>
                    <td style={{padding:'0 5px'}}>{tasks[item].filter_type}</td>
                    <td style={{padding:'0 5px'}}>{tasks[item].filters_due}</td>
                </tr>
            );
        });
    
        return rows;
    };

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontSize:".5rem", margin:"0 40px"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <Button variant="success" style={{marginRight:"20px"}} onClick={() => printContent()}>Print now</Button>
            <FloatingLabel controlId="floatingSelect" label="Font size" onChange={(e) => setFontSize(e.target.value + "rem")}>
            <Form.Select aria-label="Floating label select example">
            <option value=".5" selected>small</option>
            <option value="1.5">medium</option>
            <option value="2">large</option>
            </Form.Select>
            </FloatingLabel>
            </div>

            <div ref={equipmentRef} style={{display: componentToPrint.currentComponent === "equipment" ? "block" : "none"}}>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>Unit Name</th>
                        <th>Location</th>
                        <th>Area Served</th>
                        <th>Filter Size</th>
                        <th>Filters Due</th>
                    </tr>
                {renderEquipmentRows()}
                </table>
            </div>
            <div ref={taskRef} style={{display: componentToPrint.currentComponent === "tasks" ? "block" : "none"}}>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>Unit Name</th>
                        <th>Location</th>
                        <th>Filter Size</th>
                        <th>Filter Type</th>
                        <th>Filters Due</th>
                    </tr>
                {renderTaskRows()}
                </table>
            </div>
        <div ref={filtersRef} style={{display: componentToPrint.currentComponent === "filters" ? "block" : "none"}}>
            <table style={{width:"100%"}}>
                <tr>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Par</th>
                    <th>Count</th>
                    <th>Storage</th>
                    <th>Notes</th>
                    <th>Updated</th>
                    <th>P/N</th>
                </tr>
                {renderFilterRows()}
            </table>
        </div>
        </div>
    );
};

export default Print;