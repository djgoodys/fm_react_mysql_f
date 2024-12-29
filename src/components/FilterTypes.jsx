import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../css/fm.css';
import { manageFilterTypes } from "../thunks/filterTypesThunk";
import Modal from 'react-bootstrap/Modal';

const FilterTypes = () => {
const [message, setMessage] = useState('')
const [showEdit, setShowEdit] = useState(false)
const [editType, setEditType] = useState('')
const [newType, setNewType] = useState('')
const [editID, setEditID] = useState('')
const [showNew, setShowNew] = useState('')
const [editTrackable, setEditTrackable] = useState(true)
const [showTypes, setShowTypes] = useState(true)
const [modalTitle, setModalTitle] = useState('Modal Title no installed')
const [modalBody, setModalBody] = useState('Modal body not set')
const [modalBackGround, setModalBackGround] = useState('red')
const [modalFontColor, setModalFontColor] = useState('white')
const [showConfirmModal, setShowConfirmModal] = useState(false)
const [newTrackable, setNewTrackable] = useState(false)
const refEditTrackable = useRef(null)
const refNewTrackable = useRef(null)
const dispatch = useDispatch()
const types = useSelector((state) => state.filterTypes.filterTypes)

const handleToggle = () => { 
    setEditTrackable(prevState => !prevState)
}
const handleNewTrackable = () =>{
    setNewTrackable(prevState => !prevState)
}

types.forEach(type =>
    console.log('types1'+ type.type)
)

function editFilterType(id, type, trackable){
    setShowNew(false)
    setShowEdit(true)
    setShowTypes(false)
    setEditType(type)
    setEditID(id)
    if(trackable == 1){
            refEditTrackable.current.checked = true}
        else{
            refEditTrackable.current.checked = false
        }
    }

    function updateFilterType(){
        setShowEdit(false)
        setShowTypes(true)
        const isTrackable = refEditTrackable.current.checked ? 1 : 0
        const obj={
            action:"update-filter-type",
            type:editType,
            trackable:isTrackable,
            id:editID
        }
        dispatch(manageFilterTypes(obj))
    }

    function deleteType () {
        setShowEdit(false)
        setShowConfirmModal(false)
        const obj={
            action:"delete-filter-type",
            id:editID
        }
        dispatch(manageFilterTypes(obj))
    }

    function createFilterType(){
        setNewType('')
        const obj={
            action:"create-filter-type",
            type:newType,
            trackable:newTrackable,
        }
        dispatch(manageFilterTypes(obj))
        setMessage(newType + " filter type was created.")
    }
    

    return (
        <div>
      <div id="filter-types-nav">
            <span style={{fontSize:"1em", fontWeight:"bold"}} onClick={()=>{setShowNew(true);setShowEdit(false);setShowTypes(false)}}>ADD NEW TYPE</span>
            <span style={{fontSize:"1em", fontWeight:"bold"}} onClick={()=>{setShowNew(false);setShowEdit(false); setShowTypes(true);}}>VIEW ALL TYPES</span>
      </div>
      <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                    >
                    <Modal.Dialog style={{backgroundColor:modalBackGround, display: showConfirmModal ? "block":"none"}}>
                        <Modal.Header>
                        <Modal.Title style={{color:"red"}}>{modalTitle}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{fontWeight:"bold", fontSize:"1.3em",backgroundColor:modalBackGround, color:modalFontColor}}>
                        <p>{modalBody}</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowConfirmModal(false)}>Close</Button>
                        <Button variant="success" onClick={()=>deleteType()}>Yes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    </div>
<Table style={{display:showEdit ? "table":"none", width:"50%", margin:"0 auto", marginTop:"40px"}} id="tblEditFilterTypes" variant='lite'>
                <thead>
                <tr>
                       <th colSpan={3}>EDIT FILTER TYPE</th>
                </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" value={editID} onChange={(event)=>setEditID(event.target.value)} style={{display:"none"}}/>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Filter type"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="size" value={editType} onChange={(event)=>setEditType(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Trackable inventory"
                                value={editTrackable}
                                ref={refEditTrackable}
                                onChange={()=>handleToggle()}
                            />
                            </td>
        </tr>
        <tr>
            <td>
                <Button variant="success" onClick={()=>updateFilterType()}>Save</Button>
            </td>
            <td style={{display:"flex", gap:"100px"}}>
                <Button variant="secondary" onClick={()=>{setShowEdit(false);setShowTypes(true)}}>Close</Button>
                <Button variant="danger" onClick={()=>{setModalTitle(editType);setModalBody('Are you sure you want to permanently remove ' + editType + ' filter type?');setModalBackGround('red');setShowConfirmModal(true)}}>Delete</Button>
            </td>
        </tr>
        </tbody>
        </Table>
        <Table id="tblFilterTypes" style={{display:showTypes ? "table":"none", width:"50%", margin:"0 auto", marginTop:"40px"}} striped hover>
            <thead>
                <tr>
                    <th>
                        Type
                    </th>
                    <th>
                        Trackable inventory
                    </th>
                </tr>
            </thead>
            <tbody>
            {types.map(type =>(
                (<tr onClick={()=>editFilterType(type._id, type.type, type.trackable)}>
                <td>{type.type}</td>
                <td>{type.trackable == 1 ? (<p>yes</p>) : (<p>no</p>)}</td>
                </tr>)
                ))}
            </tbody>
        </Table>
        <Table id="tblAddNewType" style={{display:showNew ? "table":"none", width:"50%", margin:"0 auto", marginTop:"40px"}} striped hover>
            <thead>
                <tr>
                    <th>
                        Type
                    </th>
                    <th>
                        Trackable inventory
                    </th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Filter type"
                    className="mb-3">
                        <Form.Control type="text" placeholder="Type" value={newType} onChange={(event)=>setNewType(event.target.value)} />
                    </FloatingLabel>
                </td>
                <td>
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Trackable inventory"
                    value={newTrackable}
                    ref={refNewTrackable}
                    onChange={()=>handleNewTrackable()}
                />
                </td>
        </tr>
        <tr>
            <td>
                <Button variant="success" onClick={()=>createFilterType()}>Save</Button><span>    {message}</span>
            </td>
            <td style={{display:"flex", gap:"100px"}}>
                <Button variant="secondary" onClick={()=>{setShowNew(false);setShowTypes(true)}}>Close</Button>
            </td>
            </tr>
            </tbody>
        </Table>
        </div>
    )
}

export default FilterTypes