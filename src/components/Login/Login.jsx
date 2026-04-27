import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import useCommonPost from "../Custom Hooks/useCommonPost";
import SimplePopup from "../Popup/SimplePopup";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [postMethod, postPopup, setPostPopup] = useCommonPost();
    const navigate = useNavigate();

    const callBack = (data) => {
        localStorage.setItem("currUser", data?.userName);
        localStorage.setItem("role", data?.role);
        navigate("/home");
    }

    const userLogin = async () => {
        await postMethod({
            url: "http://localhost:3000/userLogin",
            data: {userName: uname, userPassword: pwd},
            sMsg: "Login Successful",
            fMsg: "Login Failed, Please Try Again",
            callBack: callBack
        })
    }

    return (
        <>
            <div className="d-flex justify-content-center row"></div>
            <div className="bg-white mt-5 col-4 mx-auto">
                <div className="px-3">
                    <Form>
                        <h2 className="text-center pt-3">LOGIN</h2>
                        <FormGroup className="mt-3">
                            <FormLabel className="fw-bold">Username</FormLabel>
                            <FormControl type="text" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Username"></FormControl>
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <FormLabel className="fw-bold">Password</FormLabel>
                            <FormControl type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password"></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Button className="col-12 my-4 fw-bold" onClick={() => userLogin()}>Login</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>

            {postPopup?.open && <SimplePopup
                open={postPopup?.open}
                close={() => setPostPopup({open: false, data: {}})}
                data={postPopup?.data}
            />}
        </>
    )
}

export default Login;