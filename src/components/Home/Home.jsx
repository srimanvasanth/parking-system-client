import { useState, useEffect } from 'react'
import { Button, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap"
import SimplePopup from '../Popup/SimplePopup';
import { useNavigate } from 'react-router-dom';
import CreateSlotsModal from '../Park-Unpark/CreateSlotsModal';
import { FaCar } from 'react-icons/fa';
import { MdTwoWheeler } from "react-icons/md";
import useCommonGet from '../Custom Hooks/useCommonGet';
import NavbarComp from './NavbarComp';
import { commonGet, commonPost } from '../../utility/apiMethods';

const Home = () => {

  const [count, setCount] = useState({twoWheel: 0, fourWheel: 0});
  const [popup, setPopup] = useState({open: false, data: {}})
  const [vehicleTypeModal, setVehicleTypeModal] = useState({open: false, action: ""});
  const [openSlot, setOpenSlot] = useState(false);
  const [getMethod, getPopup, setGetPopup] = useCommonGet();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const getAllSlots = async () => {
    getMethod({url: `${apiUrl}/getAllSlots`, callBack: getAllSlotsCB});  
    //const resp = await commonPost("http://localhost:5000/api/executions/execute/69d61fa89e7a5cc2dc7c3644", {formData: {}, sessionId: "tmp-2323121"})  
    // if(resp.data?.result?.type === "COMPLETED"){
    //   getAllSlotsCB(resp.data?.result?.response.data)
    // }
  }

  const getAllSlotsCB = (data) => {
    let slotData = data || [];
      let twoWheelerSlots = 0;
      let fourWheelerSlots = 0;
      for(let obj of slotData){
        if(!("vehicleId" in obj) && obj?.vehicleType === 2){
          twoWheelerSlots++;
        } else if(!("vehicleId" in obj) && obj?.vehicleType === 4){
          fourWheelerSlots++;
        }
      }
      setCount({twoWheel: twoWheelerSlots, fourWheel: fourWheelerSlots});
  }
  
  useEffect(()=> {
    if(!openSlot){
      getAllSlots();
    }
  },[openSlot])


  return (
    <>
      <NavbarComp/>
      <div className='d-flex justify-content-center'>
        <h2 className='text-center text-white mt-5'>PARKING APPLICATION</h2>
      </div>
      <div className="col-4 mx-auto bg-white pb-3">
        <div className='px-3 row'>
          <FormGroup>
            <FormLabel className='fw-bold mt-3'>Slots Available for Two Wheeler</FormLabel>
            <FormControl type='number' value={count.twoWheel} className='border border-1 border-black' disabled></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel className='fw-bold mt-3'>Slots Available for Four Wheeler</FormLabel>
            <FormControl type='number' value={count.fourWheel} className='border border-1 border-black' disabled></FormControl>
          </FormGroup>
          <FormGroup className='d-flex justify-content-between mt-5'>
            <Button className='col-4' onClick={() => setVehicleTypeModal({open: true, action: "Park"})}>Park</Button>
            <Button className='col-4' onClick={() => setVehicleTypeModal({open: true, action: "Unpark"})}>Unpark</Button>
          </FormGroup>
          {localStorage.role && localStorage.role === "admin" &&
            <FormGroup>
              <Button className='btn btn-success mt-3 col-12' onClick={() => setOpenSlot(true)}>Create Slots</Button>
            </FormGroup>
          }
        </div>
      </div>

      {vehicleTypeModal.open && 
        <Modal show={vehicleTypeModal.open} onHide={!vehicleTypeModal.open} keyboard={false} backdrop="static">
          <ModalHeader>
            <ModalTitle>Vehicle Type</ModalTitle>
          </ModalHeader>
          <ModalBody className='d-flex flex-column'>
            <Button className='btn btn-primary w-100 py-3 fs-4' onClick={() => navigate(vehicleTypeModal.action === "Park" ? "/parking": "/unparking", {state: {vehicleType: 2}})}>Two Wheeler
              <MdTwoWheeler className='ms-4 pb-1' size={50}/>
            </Button>
            <Button className='btn btn-primary w-100 py-3 mt-3 fs-4' onClick={() => navigate(vehicleTypeModal.action === "Park" ? "/parking": "/unparking", {state: {vehicleType: 4}})}>Four Wheeler
              <FaCar  className='ms-4 pb-1' size={50}/>
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button className='d-flex justify-content-end btn btn-secondary' onClick={() => setVehicleTypeModal({open: false, action: ""})}>Cancel</Button>
          </ModalFooter>
        </Modal>
      
      }

      {popup.open && <SimplePopup
        open={popup.open}
        close={() => setPopup({open: false, data: {}})}
        data={popup.data}
      />}

      {getPopup?.open && <SimplePopup
        open={getPopup?.open}
        close={() => setGetPopup({open: false, data: {}})}
        data={getPopup?.data}
      />}

      {openSlot && <CreateSlotsModal
        open={openSlot}
        close={() => setOpenSlot(false)}
      />}
    </>
    )
}

export default Home;