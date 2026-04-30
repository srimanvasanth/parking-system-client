import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import useCommonPost from "../Custom Hooks/useCommonPost";
import SimplePopup from "../Popup/SimplePopup";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState(false);
    const [postMethod, postPopup, setPostPopup] = useCommonPost();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const callBack = (data) => {
        localStorage.setItem("currUser", data?.userName);
        localStorage.setItem("role", data?.role);
        navigate("/home");
    }

    const userLogin = async () => {
        if(uname === "" || pwd === ""){
            setError(true);
        } else {
            await postMethod({
                url: `${apiUrl}/userLogin`,
                data: {userName: uname, userPassword: pwd},
                sMsg: "Login Successful",
                fMsg: "Login Failed, Please Try Again",
                callBack: callBack
            })
        }
    }

    const handleChange = (value, field) => {
        setError(false);
        field === "uname" && setUname(value);
        field === "pwd" && setPwd(value);
    }

    return (
        <>
            <div className="d-flex justify-content-center row"></div>
            <div className="bg-white mt-5 col-4 mx-auto">
                <div className="px-3">
                    <Form>
                        <h2 className="text-center pt-3">LOGIN</h2>
                        <FormGroup className="mt-3">
                            <FormLabel className="fw-bold">Username</FormLabel><span className="text-danger"> * </span>
                            <FormControl type="text" value={uname} onChange={(e) => handleChange(e.target.value, "uname")} placeholder="Username"></FormControl>
                        </FormGroup>
                        <FormGroup className="my-3">
                            <FormLabel className="fw-bold">Password</FormLabel><span className="text-danger"> * </span>
                            <FormControl type="password" value={pwd} onChange={(e) => handleChange(e.target.value, "pwd")} placeholder="Password"></FormControl>
                        </FormGroup>
                        {error && <p className="text-center text-danger">Enter required(*) fields</p>}
                        <FormGroup>
                            <Button className={`col-12 fw-bold ${error ? "mb-4" : "my-4"}`} onClick={() => userLogin()}>Login</Button>
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
