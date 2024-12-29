import React, { useDebugValue, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { manageFilters } from '../thunks/filtersThunk'
import Table from 'react-bootstrap/Table';
import '../css/fm.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { manageFilterTypes } from '../thunks/filterTypesThunk';
import { useNavigate } from 'react-router-dom';

const Filters = () =>{
const loading = useSelector((state) => state.filters.loading)
const error = useSelector((state) => state.filters.error)
const dispatch = useDispatch()
const [showEdit, setShowEdit] = useState(false)
const [editSize, setEditSize] = useState('')
const refEditSize = useRef(null)
const [editType, setEditType] = useState('')
const refEditType = useRef(null)
const [editCount, setEditCount] = useState('')
const refEditStock = useRef(null)
const [editPar, setEditPar] = useState('')
const refEditPar = useRef(null)
const [editStorage, setEditStorage] = useState('')
const refEditStorage = useRef(null)
const [editNotes, setEditNotes] = useState('')
const refEditNotes = useRef(null)
const [newSize, setNewSize] = useState('')
const refNewSize = useRef(null)
const [newType, setNewType] = useState('')
const refNewType = useRef(null)
const [newCount, setNewCount] = useState('')
const refNewStock = useRef(null)
const [newNotes, setNewNotes] = useState('')
const refNewNotes = useRef(null)
const [newPar, setNewPar] = useState('')
const refNewPar = useRef(null)
const [newStorage, setNewStorage] = useState('')
const refNewStorage = useRef(null)
const [newPN, setNewPN] = useState('')
const refNewPN = useRef(null)
const refEditUpdated = useRef(null)
const [editID, setEditID] = useState('')
const [ID, setID] = useState('')
const [editPN, setEditPN] = useState('')
const refEditPN = useRef(null)
const [showFilters, setShowFilters] = useState(true)
const [modalTitle, setModalTitle] = useState('Modal Title no installed')
const [modalBody, setModalBody] = useState('Modal body not set')
const [modalBackGround, setModalBackGround] = useState('red')
const [modalFontColor, setModalFontColor] = useState('white')
const [showConfirmModal, setShowConfirmModal] = useState(false)
const [showNew, setShowNew] = useState(false)
const [filter_types, setFilterTypes] = useState([])
const refslctFilter = useRef(null)   
const [filters, setFilters] = useState([])
const navigate = useNavigate()

const getFilters =  async()=>{
    const obj={
        action:"get-all-filters",
    }
    try{
        const result = await dispatch(manageFilters(obj))
        const response = result.payload
    } catch (error) {
         console.error("Error fetching filters:", error); 
    }
} 
useEffect(()=>{
    getFilters()
},[])

let allfilters = useSelector((state) => state.filters)
//console.log("allfilter keys="+ Object.keys(allfilters))
useEffect(()=>{
    let filtersArray = [allfilters.filters]
    const fil = filtersArray.map(item => ({ ...item }));
    const filters1 = fil.map(filter => ({
        ...filter
    }))
    //let filters = []
    let x=0
    let filt = ''
    let fArray = []
    filters1.forEach((item, index) =>{
        Object.keys(item).forEach((filterindex, index)=>{
            //console.log("filter=" ,item[filterindex]);
            filt = item[filterindex]
            fArray.push(filt)
            
        })
        setFilters(fArray)
        //console.log(item[x].filter_size);
    })
}, [allfilters])



// filters.forEach(item => {
//         //console.log("f="+item);
// });


function editFilter(id, size, type, count, par, storage, notes, pn){
    setShowEdit(true)
    setShowFilters(false)
    setShowNew(false)
    setEditID(id)
    setEditSize(size)
    setEditType(type)
    setEditCount(count)
    setEditPar(par)
    setEditStorage(storage || "")
    setEditNotes(notes)
    setEditPN(pn)
}

function updateFilter(){
    setShowEdit(false)
    setShowFilters(true)
const obj={
    action:"update-filter",
    id:editID,
    filter_type:editType,
    filter_size:editSize,
    count:editCount,
    par:editPar,
    storage:editStorage,
    notes:editNotes,
    pn:editPN
}
    dispatch(manageFilters(obj))
}


function deleteFilter(){
    const obj={
    action:"delete-filter",
    id:editID
}
dispatch(manageFilters(obj))
setShowConfirmModal(false)
setShowEdit(false)
setShowFilters(true)
}
useEffect(() => {
}, []);



let ftypes = useSelector((state) => state.types)
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

function addNewFilter() {
    const obj={
        action:"add-new-filter",
        filter_type:newType,
        count:newCount,
        par:newPar,
        storage:newStorage,
        notes:newNotes,
        pn:newPN
    }
        dispatch(manageFilters(obj))
        setNewCount('')
        setNewNotes('')
        setNewPar('')
        setNewSize('')
        setNewStorage('')
        setNewType('')
        setNewPN('')
    }
       
    //The function below was needed because the remote server returns the wrong Date format even though when viewed through PHPmyAdmin it show Y-m-d
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', options); 
        }

    if (loading) { return <div>Loading...</div>; } 
    if (error) { return <div>Error: {error}</div>; }

    return (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} >
                    
                <div style={{display:"flex", flexDirection:"row", gap:"50px", justifyContent:"space-between", marginTop:"25px", border:"1px solid grey", padding:"20px"}}>
                    <Button variant="secondary" onClick={()=>setShowNew(true)}>Create new filter</Button>
                    <Button variant="secondary" onClick={()=>{setShowNew(false);setShowEdit(false);setShowFilters(true)}}>View filter inventory</Button>
                    <Button variant="secondary" onClick={()=>navigate("/filter-types")}>Manage filter types</Button>
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
                        <Button variant="secondary" onClick={()=>setShowConfirmModal(false)}>Cancel</Button>
                        <Button variant="success" onClick={()=>deleteFilter()}>Yes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    </div>
                    <Table style={{display:showNew ? "table":"none"}} id="tblNewFilter" variant='lite'>
                <thead>
                <tr>
                       <th colSpan={7}>CREATING NEW FILTER</th>
                </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Filter size"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="size" value={newSize} onChange={(event)=>setNewSize(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <Form.Select id="slct-filter-type" style={{margin:"26px 0"}}  ref={refslctFilter} value={newType}
                                    onChange={(event) => {setNewType(event.target.value)}}>
                                    <option disabled selected>Select Filter Type</option>
                                    {filter_types.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                            </Form.Select>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Amount in stock"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="stock" value={newCount} onChange={(event)=>setNewCount(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Par"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="par" value={newPar} onChange={(event)=>setNewPar(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Storage locations"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="storage" value={newStorage} onChange={(event)=>setNewStorage(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                            controlId="floatingInput"
                            label="Notes"
                            className="mb-3">
                                <Form.Control type="text" placeholder="notes" value={newNotes} onChange={(event)=>setNewNotes(event.target.value)} />
                            </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                            controlId="floatingInput"
                            label="Part number"
                            className="mb-3">
                                <Form.Control type="text" placeholder="Part number" value={newPN} onChange={(event)=>setNewPN(event.target.value)} />
                            </FloatingLabel>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><Button style={{margin:"0 20px"}} variant="outline-success" onClick={()=>addNewFilter()}>Save</Button></td>
                            <td></td>
                            <td><Button variant="outline-secondary" style={{margin:"0 20px"}} onClick={()=>{setShowNew(false);setShowFilters(true)}}>Cancel</Button></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
                </Table>
                <Table style={{display:showEdit ? "table":"none"}} id="tblEditFilter" variant='lite'>
                <thead>
                <tr>
                       <th colSpan={7}>EDITING FILTER SIZE {editSize}</th>
                </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Filter size"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="size" value={editSize} onChange={(event)=>setEditSize(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <Form.Select id="slct-filter-type" style={{margin:"26px 0"}}  ref={refslctFilter} value={editType}
                                    onChange={(event) => {setEditType(event.target.value)}}>
                                    <option disabled selected>Select Filter Type</option>
                                    {filter_types.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                            </Form.Select>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Amount in stock"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="stock" value={editCount} onChange={(event)=>setEditCount(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Par"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="par" value={editPar} onChange={(event)=>setEditPar(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Storage locations"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="storage" value={editStorage} onChange={(event)=>setEditStorage(event.target.value)} />
                                </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                            controlId="floatingInput"
                            label="Notes"
                            className="mb-3">
                                <Form.Control type="text" placeholder="notes" value={editNotes} onChange={(event)=>setEditNotes(event.target.value)} />
                            </FloatingLabel>
                            </td>
                            <td>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Part #"
                                className="mb-3">
                                    <Form.Control type="text" placeholder="part#" value={editPN} onChange={(event)=>setEditPN(event.target.value)} />
                                </FloatingLabel>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><Button style={{margin:"0 20px"}} variant="outline-success" onClick={()=>updateFilter()}>Save</Button></td>
                            <td><Button variant="outline-danger" style={{margin:"0 20px"}} onClick={()=>{setShowConfirmModal(true);setModalTitle("Confirm to delete filter");setModalBody("Are you sure you want to permanently remove this filter size?")}}>Delete</Button></td>
                            <td><Button variant="outline-secondary" style={{margin:"0 20px"}} onClick={()=>{setShowEdit(false);setShowFilters(true)}}>Cancel</Button></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
                </Table>
                <div>showing {filters.length} filters</div>
                <Table id="tblFilters" style={{display: showFilters ? "table":"none"}} variant='dark' striped hover>
                    <thead style={{position:"sticky", top:"0"}}>
                        <tr>
                        <th>ID</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Stock</th>
                        <th>Par</th>
                        <th>Storage</th>
                        <th>Notes</th>
                        <th>Updated</th>
                        <th>Part #</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filters && filters.map((filter, index)=>
                       
                            <tr key={index} onClick={()=>editFilter(filter._id,filter.filter_size, filter.filter_type, filter.filter_count, filter.par, filter.storage, filter.notes, filter.pn)} >
                                <td>{filter._id}</td>
                                <td>{filter.filter_size}</td>
                                <td>{filter.filter_type}</td>
                                <td>{filter.filter_count}</td>
                                <td>{filter.par}</td>
                                <td>{filter.storage}</td>
                                <td>{filter.notes}</td>
                                <td>{formatDate(filter.date_updated)}</td>
                                <td>{filter.pn}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                </div>
    )
}

export default Filters