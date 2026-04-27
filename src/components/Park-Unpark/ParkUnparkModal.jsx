import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalTitle } from "react-bootstrap";

const ParkUnparkModal = ({ open, close, title, apiCall, data }) => {

    const [plateNbr, setPlateNbr] = useState("");

    function validatePlateNbr(val) {
        if(val?.length <= 10){
            setPlateNbr((val).toUpperCase())
        }
    }

    function renderDateTime(dateString) {
        const date = new Date(dateString).toLocaleDateString("en-GB");
        const time = new Date(dateString).toLocaleTimeString("en-US");

        return date + " " + time
    }

    return (
        <>
            <Modal keyboard={false} backdrop="static" show={open} onHide={close} centered>
                <ModalTitle className="text-center my-3">
                    <h3>{title} Vehicle</h3>
                </ModalTitle>

                <ModalBody>
                    <Container>
                        {title === "Park" ? 
                        <FormGroup>
                            <FormLabel>Plate Number</FormLabel>
                            <FormControl type="text" value={plateNbr} autoFocus placeholder="Example: TN01 A0000" onChange={(e) => validatePlateNbr(e.target.value)}></FormControl>
                        </FormGroup>
                        :
                        <div>
                        <FormGroup>
                            <FormLabel>Plate Number</FormLabel>
                            <FormControl type="text" className="border border-black" value={data?.vehicleId?.plateNbr && (data?.vehicleId?.plateNbr).toUpperCase()} disabled></FormControl>
                        </FormGroup>  
                        <FormGroup className="mt-3">
                            <FormLabel>Parked Date and Time</FormLabel>
                            <FormControl type="text" className="border border-black" value={renderDateTime(data?.parkedDate)} disabled ></FormControl>
                        </FormGroup>
                        </div>                      
                        }
                        <div className="mt-3 d-flex justify-content-end">
                            <Button className="btn btn-secondary mx-2" onClick={() => close()}>Cancel</Button>
                            <Button onClick={() => apiCall(title === "Park" ? plateNbr : data)}>{title}</Button>
                        </div>
                    </Container>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ParkUnparkModal;