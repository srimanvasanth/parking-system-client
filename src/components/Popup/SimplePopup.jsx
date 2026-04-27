import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SimplePopup = ({open, close, data}) => {

    const navigate = useNavigate();

    return (
        <>
        <Modal show={open} onHide={close} size={`${data?.size || null}`} backdrop={"static"} keyboard={false} centered>
            <ModalHeader className={`bg-${data?.bgColor || "success"}`}>
                <ModalTitle className="mx-auto text-white">
                    {data?.title}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="mx-auto my-3">
                {data?.message}
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button className="btn btn-primary px-4" onClick={() => data?.action === "logout" ? navigate("/login", {replace: true}) : close()}>OK</Button>
            </ModalFooter>
            
        </Modal>

        </> 
    )
}

export default SimplePopup;