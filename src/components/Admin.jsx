import React, { useEffect, useRef, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import '../css/fm.css';
import { useDispatch, useSelector } from 'react-redux';
import { manageUsers } from '../thunks/usersThunk'
import Modal from 'react-bootstrap/Modal';

const Admin = () => {
    const Style = {
        centered: {
            textAlign: 'center'
        },
        td: {
      
            textAlign:"center"
        },
        boxshadow: {
            boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)'
        },
        noborder:{
            border:"none"
        },
        NavLink: {
            fontSize: '2em',
            color: 'rgb(173, 136, 251)',
            fontWeight: 'bold'
        }
    }

    const [modalTitle, setModalTitle] = useState('Modal Title no installed')
    const [modalBody, setModalBody] = useState('Modal body not set')
    const [modalBackGround, setModalBackGround] = useState('red')
    const [modalFontColor, setModalFontColor] = useState('white')
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const refEditID = useRef(null)
    const refUserName = useRef(null)
    const refPassword = useRef(null)
    const refEmail = useRef(null)
    const refIsAdmin = useRef(null)
    const refEditUserName = useRef(null)
    const refEditPassword = useRef(null)
    const refEditEmail = useRef(null)
    const refEditAdmin = useRef(null)
    const refUsersTable = useRef(null)
    const [editID, setEditID] = useState('')
    const [editAdmin, setEditAdmin] = useState('')
    const [editUsername, setEditUsername] = useState('')
    const [editPassword, setEditPassword] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [adminChecked, setAdminChecked] = useState(false)
    const dispatch = useDispatch()
    const backupFolder = useSelector((state) => state.userData)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    useEffect(() => {
        document.title = "FM - Admin"
        return () => {
            document.title = "My React App";
        }
    }, []);

    function closeAllTables(){
        setShowAdd(false)
        setShowEdit(false)
    }
    //-----GET ALL USERS----------------
    function getUsers(){
        const obj={
            action:"get-all-users"
        }
            dispatch(manageUsers(obj))
        }

    useEffect(()=>{
        getUsers()
    },[])

    const users = useSelector((state)=> state.users.users)
    console.log('users='+users);

    const addNewUser = () => {
        closeAllTables()
        // const admin = refEditIsAdmin.checked ? "true":"false"
        // const obj = {
        //     id=refEditID,
        //     username:refEditUserName.current.value,
        //     email:refEditEmail.current.value,
        //     password:refEditPassword.current.value,
        //     admin:admin,
        //     action:"add-user"
        // }
    }

    const updateUser = () => {
        setShowEdit(false)
        if (refEditID.current && refEditUserName.current && refEditPassword.current && refEditEmail.current && refEditAdmin.current) {
            const checked = editAdmin ? "yes" : "no"
            const obj = {
                action: "edit-user",
                id: refEditID.current.value,
                username: refEditUserName.current.value,
                password: refEditPassword.current.value,
                email: refEditEmail.current.value,
                admin: checked
            }
            dispatch(manageUsers(obj))
        }
    }

    const editUser = (rowIndex) => {
        const x = rowIndex + 1
        let table;
        closeAllTables()
        setShowEdit(true)
        if (refUsersTable.current) {
            table = refUsersTable.current;
            if (table && table.rows[x]) {
                const row = table.rows[x];
                const cells = Array.from(row.cells);
                cells.map((cell, index) => {
                    switch (index) {
                        case 0:
                            setEditID(cell.textContent)
                            break
                        case 1:
                            setEditUsername(cell.textContent);
                            break;
                        case 2:
                            setEditPassword(cell.textContent)
                            break
                        case 3:
                            setEditEmail(cell.textContent)
                            break
                        case 4:
                            if (cell.textContent === "yes") {
                                setEditAdmin(true)
                            } else {
                                setEditAdmin(false)
                            }
                            break;
                    }
                })
            }
        }
    }

    function deleteUser () {
        const obj={
            action:"delete-user",
            id:editID
        }
        dispatch(manageUsers(obj))
    }
    
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%" }}>
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
                        <Button variant="secondary" onClick={()=>{setShowConfirmModal(false);deleteUser();}}>Cancel</Button>
                        <Button variant="success">Yes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    </div>
            <div id="menu">
            <span style={{padding:"15px", width:"100px", height:"20px", textAlign:"center"}} onClick={() => {closeAllTables();setShowAdd(true)}}>Add user</span>
             <span style={{padding:"15px", width:"100px", textAlign:"center", marginLeft:"30px"}} onClick={()=>closeAllTables()}>User list</span>
            </div>
        <Table style={{ border:"2px solid black", borderRadius:"8pw", width: "60%", display:showEdit ? "table":"none" }}>
            <thead >
            <th colSpan={2} style={{textAlign:"center",...Style.noborder}}>EDITING USER {editUsername}</th>
            <th style={Style.noborder}></th>
            </thead>
            <tbody>
                <tr>
                    <td style={Style.noborder}>
                        <><input type="text" ref={refEditID} value={editID} onChange={(event) => setEditID(event.target.value)} style={{ width: "20px", height: "20px", display:"none" }} />
                            <FloatingLabel controlId="editusername" label="User name" className="mb-3" style={Style.boxshadow} >
                                <Form.Control ref={refEditUserName} onChange={(event) => setEditUsername(event.target.value)} type="text" placeholder="" value={editUsername} />
                            </FloatingLabel>
                        </>
                    </td>
                    <td style={Style.noborder}>
                        <FloatingLabel controlId="editfloatingPassword" label="Password" style={Style.boxshadow} >
                            <Form.Control ref={refEditPassword} onChange={(event) => setEditPassword(event.target.value)}
                                value={editPassword} type="text" placeholder="Password" />
                        </FloatingLabel>
                    </td>
                </tr>
                <tr>
                    <td style={Style.noborder}>
                        <FloatingLabel controlId="editemail" label="Email">
                            <Form.Control ref={refEditEmail} onChange={(event) => setEditEmail(event.target.value)} type="email" placeholder="Email" style={Style.boxshadow} value={editEmail} />
                        </FloatingLabel>
                    </td>
                    <td style={{display:"flex", justifyContent:"flex-end",...Style.noborder}}>
                        <div style={{ backgroundColor: "white", borderRadius: "8px", height: "70px", width:"100%", padding: "0 0px 0 10px", margin:"0", ...Style.boxshadow }} >
                            Admin can add, delete or edit users.
                            <Form.Switch // prettier-ignore
                                type="switch"
                                id="isadmin"
                                label="Make admin"
                                checked={editAdmin}
                                ref={refEditAdmin}
                                onChange={(event) => setEditAdmin(event.target.checked)}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{...Style.td, ...Style.noborder}} >
                       <Button variant="outline-secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
                    </td>
                    <td style={{...Style.td, ...Style.noborder}}>
                        <Button stye={{ marginLeft: "20px" }} variant="outline-success" onClick={() => updateUser()}>Save changes</Button>
                    </td>
                    <Button variant='outline-danger' onClick={()=>{setShowConfirmModal(true);setModalTitle("Confirm to delete user : "+editUsername);setModalBody("Are you sure you want to permanently remove user "+editUsername+" ?")}}>Delete</Button>
                </tr>
            </tbody>
            </Table>

                <Table bordered hover style={{ margin: "0 auto", display: showAdd ? "table":"none" }} >
                    <thead >
                        <tr >
                            <th colSpan={2} style={{ textAlign: "center" }}>ADD NEW USER</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={Style.td} >
                                <>
                                    <FloatingLabel controlId="username" label="User name" className="mb-3" style={Style.boxshadow} >
                                        <Form.Control ref={refUserName} type="text" placeholder="" />
                                    </FloatingLabel>
                                </>
                            </td>
                            <td style={Style.td} >
                                <FloatingLabel controlId="floatingPassword" label="Password" style={Style.boxshadow} >
                                    <Form.Control ref={refPassword} type="text" placeholder="Password" />
                                </FloatingLabel>
                            </td>
                        </tr>
                        <tr>
                            <td style={Style.td} >
                                <FloatingLabel controlId="email" label="Email">
                                    <Form.Control ref={refEmail} type="email" placeholder="PEmail" style={Style.boxshadow} />
                                </FloatingLabel>
                            </td>
                            <td style={Style.td} ><div style={{ backgroundColor: "white", borderRadius: "8px", height: "70px", padding: "0 10px 0 20px", ...Style.boxshadow }} ><span>Admin can add, delete or edit users.</span>
                                <Form.Switch  prettier-ignore
                                    type="switch"
                                    id="isadmin"
                                    label="Make admin"
                                    ref={refIsAdmin}
                                />
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
                    <Button variant="outline-primary" style={{ margin: "0 auto", ...Style.boxshadow }}>Submit</Button>
                    <Button variant="outline-dark" style={Style.boxshadow} onClick={()=>setShowAdd(false)}>Cancel</Button>
                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped hover ref={refUsersTable} id="tblUsers">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Is admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? users.map((user, index) =>
                            <tr onClick={() => editUser(index)}>
                                <td>
                                    {user._id}
                                </td>
                                <td>
                                    {user.user_name}
                                </td>
                                <td>
                                    {user.password}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.admin}
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </Table>
        </div>

    )
}
export default Admin