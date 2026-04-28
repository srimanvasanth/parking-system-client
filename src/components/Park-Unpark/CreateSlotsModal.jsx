import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import useCommonPost from "../Custom Hooks/useCommonPost";
import SimplePopup from "../Popup/SimplePopup";

const CreateSlotsModal = ({open, close}) => {
    const [nbrOfSlots, setNbrOfSlots] = useState('');
    const [vehicleType, setVehicleType] = useState(0);
    const [postMethod, postPopup, setPostPopup] = useCommonPost();
    const apiurl = import.meta.env.VITE_API_URL;

    const createSlots = () => {
        if(vehicleType !== ""){
            postMethod({
                url: apiurl + "/createSlots",
                data: {nbrOfSlots, vehicleType },
                sMsg: "Slots Created Successfully",
                fMsg: "Slot Creation Failed",            
            })
        }
    }

    const validateSlots = (val) => {
        if((/^\d+$/.test(val) || val === "") && Number(val) <=50){
            setNbrOfSlots(val !== "" ? Number(val) : "");
        }
    }

    const closeModal = () => {
        setPostPopup(() => ({open: false, data: {}}))
        close()
    }

    return (
        <>
            <Modal show={open} onHide={close} backdrop={"static"} keyboard={false} centered>
                <ModalHeader>
                    <ModalTitle>
                        Create Slots
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormLabel>
                                Vehicle Type
                                <span className="text-danger"> *</span>
                            </FormLabel>
                            <FormSelect className="border border-black" onChange={(e) => setVehicleType(e.target.value)} required>
                                <option value={""}>---Select Vehicle Type---</option>
                                <option value={2}>Two Wheeler</option>
                                <option value={4}>Four Wheeler</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mt-4">
                            <FormLabel>
                                Number of Slots
                                <span className="text-danger"> *</span>                                
                            </FormLabel>
                            <FormControl className="border border-black" type="text" placeholder="Number of Slots" value={nbrOfSlots} onChange={(e) => validateSlots(e.target.value)} required></FormControl>
                        </FormGroup>
                        <p className="mt-2 ms-2"><span className="text-danger">* </span>When Slots are created existing slots and parking data will be deleted. Maximum slots allowed is 50</p>
                        <div className="d-flex justify-content-end mt-2">
                            <Button className="btn btn-secondary" onClick={() => close()}>Cancel</Button>
                            <Button className="ms-3" onClick={() => createSlots()}>Create</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

            {postPopup?.open && <SimplePopup
                open={postPopup?.open}
                close={() => closeModal()}
                data={postPopup?.data}
            />}
        </>
    )
}

export default CreateSlotsModal;
