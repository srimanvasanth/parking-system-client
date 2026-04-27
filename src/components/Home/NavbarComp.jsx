import { Container, Navbar, NavbarBrand } from "react-bootstrap"
import { replace, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import useCommonPost from "../Custom Hooks/useCommonPost";
import SimplePopup from "../Popup/SimplePopup";

const NavbarComp = () => {
    const navigate = useNavigate();
    const [postMethod, postPopup, setPostPopup] = useCommonPost();
    const apiUrl = import.meta.env.VITE_API_URL;

    const logOutUser = () => {
        postMethod({
            url: `${apiUrl}/logOut`,
            data: { username: localStorage?.currUser},
            callBack: logOut
        })
    }

    const logOut = () => {
        navigate("/login", {replace: true});
    }

    return (
        <>
            <Navbar bg="light" className="d-flex justify-content-between py-1">
                <div>
                    <NavbarBrand className="ms-5 btn btn-primary text-white fs-6" onClick={() => navigate("/home")}>
                        Home
                    </NavbarBrand>                    
                </div>
                <div className="d-flex">                    
                    <div>
                        <p className="px-4 mt-2 fw-3" title="Current User">User: {localStorage?.currUser ? localStorage?.currUser : ""}</p>
                    </div>
                    {localStorage.role && localStorage.role === "admin" && 
                        <CgProfile className="btn btn-secondary p-1 mt-1 me-3" size={40} title="User Management" onClick={() => navigate("/manage-user")}/>}
                    <IoMdLogOut className="btn btn-secondary p-1 mt-1 me-5" size={40} title="Logout" onClick={() => logOutUser()}/>
                </div>
            </Navbar>

            {postPopup?.open && <SimplePopup
                open={postPopup?.open}
                close={() => setPostPopup({open: false, data: {}})}
                data={postPopup?.data}
            />}
        </>
    )
}

export default NavbarComp;