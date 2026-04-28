import { useEffect, useState } from "react";
import { commonGet } from "../../utility/apiMethods";
import { FaCar } from "react-icons/fa";
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, PageItem, Pagination, Row } from "react-bootstrap";
import useCommonPost from "../Custom Hooks/useCommonPost";
import SimplePopup from "../Popup/SimplePopup";
import { IoArrowBack } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom";
import ParkUnparkModal from "./ParkUnparkModal";
import { MdTwoWheeler } from "react-icons/md";
import NavbarComp from "../Home/NavbarComp";

const Unparking = () => {

    const apiurl = import.meta.env.VITE_API_URL;
    const [slotData, setSlotData] = useState([]);
    const [pageLimit, setPageLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [openParking, setOpenParking] = useState({open: false, data: {}});
    const [plateNbr, setPlateNbr] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [postMethod, postPopup, setPostPopup] = useCommonPost();
    const navigate = useNavigate();
    const location = useLocation();
    const vehicleType = location.state.vehicleType;
    
    const getAllSlots = async () => {
        const resp = await commonGet(`${apiurl}/getAllSlots`);
        const slots = [];
        const allSlots = resp.data?.data || [];

        for(let slot of allSlots) {
          if("vehicleId" in slot && slot?.vehicleType === vehicleType){
            slots.push(slot);
          }
        }
        setSlotData(slots);    
        slots.length === 0 ? setTrigger(true) : setTrigger(false);    
    }

    const start = (currentPage - 1) * pageLimit;

    const slicedData = slotData.slice(start, start + pageLimit);

    const pageArr = [...Array(Math.ceil(slotData.length/pageLimit))]

    const openParkingModal = (data) => {
        setOpenParking({open: true, data: data});
    }

    useEffect(() => {
        getAllSlots();
    }, [])

    const closePopup = () => {
        setPostPopup({open: false, data: {}});
        setOpenParking({open: false, data: {}});
        getAllSlots();
    }

    const unparkVehicle = (selectedVehicle) => {
        postMethod({
            url: `${apiurl}/unparkVehicle`,
            data: {
              plateNbr: selectedVehicle?.vehicleId?.plateNbr,
              vehicleType: selectedVehicle?.vehicleId?.vehicleType
            },
        })
    } 

    return (
        <>
            <NavbarComp/>
            <IoArrowBack size={40} color="white" className="btn btn-secondary p-1 rounded-circle top-0 start-0 mt-3 ms-3" onClick={() => navigate(-1)}/>
            <div className='d-flex justify-content-center'>
                <h2 className='text-center text-white mt-2'>{vehicleType === 2 ? "TWO WHEELER UNPARKING" : "FOUR WHEELER UNPARKING"}</h2>
            </div>
            {trigger ?  
            <div className="d-flex justify-content-center align-items-center mt-5">
              <h1>No Vehicles are Currently Parked</h1>
            </div> :
            
            <div className="d-flex justify-content-center">
              <Container className="w-50 d-flex flex-column" style={{minHeight: "70vh"}}>
                  <div className="flex-grow-1">
                      <Row className="row-cols-4">
                          {slicedData?.map((data) => (
                            <Col key={data?._id}>
                                  <Card className={"d-flex justify-content-center align-items-center btn btn-secondary mt-5 pt-3 mb-3"} onClick={() => openParkingModal(data)}>
                                       {vehicleType === 2 ? <MdTwoWheeler size={60}/>  : <FaCar size={60}/>}
                                      <CardBody>
                                          <CardTitle className="mx-auto">
                                              Slot No: {data?.slotNbr}
                                          </CardTitle>
                                          <CardText className="text-center">{data?.vehicleId?.plateNbr && (data?.vehicleId?.plateNbr).toUpperCase()}</CardText>
                                      </CardBody>
                                  </Card>                            
                              </Col>
                          ))}
                      </Row>
                  </div>
                  {pageArr.length > 1 && <Pagination className="justify-content-end align-items-end mt-3">
                      {pageArr.map((_, i) => (
                          <PageItem key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                              {i + 1}
                          </PageItem>
                      ))}
                  </Pagination>}
              
              </Container>
            </div>}

            {openParking.open && <ParkUnparkModal
                open={openParking.open}
                close={() => closePopup()}
                data={openParking.data}
                title={"Unpark"}
                apiCall={(plateNbr) => unparkVehicle(plateNbr)}
            />}

            {postPopup?.open && <SimplePopup
                open={postPopup?.open}
                close={() => closePopup()}
                data={postPopup?.data}
            />}
        </>
    )
}

export default Unparking;
