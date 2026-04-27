import { useState } from "react";
import useCommonPost from "../Custom Hooks/useCommonPost";
import { Button, Container, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import NavbarComp from "../Home/NavbarComp";
import { useEffect } from "react";
import { HiPlusCircle } from "react-icons/hi"
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa"
import { MdOutlineEdit } from "react-icons/md"
import SimplePopup from "../Popup/SimplePopup";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [addUser, setAddUser] = useState({userName: "", userPassword: "", role: ""});
    const [showPwd, setShowPwd] = useState(false);
    const [addUserPopup, setAddUserPopup] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [postMethod, postPopup, setPostPopup] = useCommonPost();

    const getUsers = async () => {
        function getUserCB(data) {
            setUsers(data);
            setTrigger(true);
        }
        postMethod({
            url: `${apiUrl}/getAllUsers`,
            data: {userName: localStorage.getItem("currUser")},
            fMsg: "Can't Fetch Users",
            cancelPopup: true,
            callBack: getUserCB
        })
    }

    const saveUser = async () => {
        function saveUserCB() {
            setAddUserPopup(false);
            getUsers();
        }
        postMethod({
            url: `${apiUrl}/saveUser`,
            data: addUser,
            sMsg: "User Saved Successfully!",
            callBack: saveUserCB
        });
    }

    const deleteUser = (user) => {
        function deleteUserCB() {
            getUsers();
        }
        postMethod({
            url: `${apiUrl}/deleteUser`,
            data: {userName: user.userName, currUser: localStorage.getItem("currUser")},
            sMsg: "User Saved Successfully!",
            callBack: deleteUserCB
        });
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <NavbarComp/>
            <Container className="bg-white w-50 mt-5">
                <div className="p-3">
                    <div className="d-flex justify-content-end my-3">
                        <HiPlusCircle size={40} className="btn btn-success p-1 border rounded-circle" onClick={() => setAddUserPopup(true)}/>
                    </div>
                    {trigger && <table className="p-5 table">
                        <thead className="table-dark">
                            <tr>
                                <th>User Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trigger && users.length > 0 && 
                                users.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data?.userName}</td>
                                            <td>{data?.role}</td>
                                            <td>{<FaTrash className="btn btn-danger p-1 mx-2" size={30} onClick={() => deleteUser(data)}/>}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>}
                </div>

                {addUserPopup &&
                    <Modal show={addUserPopup} onHide={!addUserPopup} backdrop="static" keyboard={false}>
                        <ModalHeader>
                            <ModalTitle className="mx-auto">Add User</ModalTitle>                            
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <FormLabel>User Name</FormLabel>
                                <FormControl minLength={3} maxLength={15} onChange={(e) => setAddUser((pre) => ({...pre, userName: e.target.value}))}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <FormControl type={ showPwd ? "text" : "password"} minLength={8} maxLength={16} onChange={(e) => setAddUser((pre) => ({...pre, userPassword: e.target.value}))}></FormControl>
                                {showPwd ? <FaEyeSlash className="btn p-1" color="gray" size={40} onClick={() => setShowPwd((pre) => !pre)}/> :
                                    <FaEye className="btn p-1" color="gray" size={40} onClick={() => setShowPwd((pre) => !pre)}/>}
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Role</FormLabel>
                                <FormSelect onChange={(e) => setAddUser((pre) => ({...pre, role: e.target.value}))}>
                                    <option value={""} selected>---select---</option>
                                    <option value={"admin"}>Admin</option>
                                    <option value={"staff"}>Staff</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup className="my-3 d-flex justify-content-end">
                                <Button onClick={() => setAddUserPopup(false)} className="mx-2 btn btn-secondary">Cancel</Button>
                                <Button onClick={() => saveUser()}>Submit</Button>
                            </FormGroup>
                        </ModalBody>
                    </Modal>
                }
            </Container>

            {postPopup?.open && <SimplePopup
                open={postPopup?.open}
                close={() => setPostPopup(false)}
                data={postPopup?.data}
            />}
        </>
    )
}

export default UserManagement;