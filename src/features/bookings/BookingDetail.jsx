import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import {HiArrowDownOnSquare ,HiArrowUpOnSquare} from 'react-icons/hi2'
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from '../../ui/Modal'
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import ConfirmDelete from "../../ui/CofirmDelete";
import Empty from "../../ui/Empty"
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const BookingDetail = () => {
  const moveBack = useMoveBack();
  const { booking={}, isLoading } = useBooking();
  const {checkout,isCheckingOut} = useCheckout();
  const {deleteBooking,isDeleting} = useDeleteBooking();
  const navigate = useNavigate();
  const { status ,id:bookingId } = booking;
  if (isLoading) return <Spinner/>
  if(!booking) return <Empty resourceName="Booking"/>
  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
  <>
   <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
             {
              status === "unconfirmed"&&  <Button 
              icon = {<HiArrowDownOnSquare/>} 
              onClick= {()=> navigate(`/checkin/${bookingId}`)}>
              Check In
             </Button>
             }
                 {
              status === "checked-in"&&  <Button 
              icon = {<HiArrowUpOnSquare/>} 
              onClick= {()=>checkout(bookingId)}
              diabled={isCheckingOut}>
              Check Out
             </Button>
             }
              <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate("/bookings"),
                })
              }
            />
          </Modal.Window>
        </Modal>

      <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      
      </ButtonGroup>
  </>
  )
}

export default BookingDetail