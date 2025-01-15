import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-modern-modal";
import UserServices from '../services/UserServices'

const BookTicket = ({ flag, setFlag, bookingDetails , setBookingDetails, handleSearchBus}) => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerContact, setPassengerContact] = useState('');
  const [totalFare, setTotalFare] = useState(0);
  const [seatCount, setSeatCount] = useState(0);
  const remainingSeats = bookingDetails.available_seats - bookingDetails.booked_seat ;

  const handleIncrement = () => {
    if (seatCount < remainingSeats) {
      setSeatCount(seatCount + 1);
    } else {
      toast.error("No more seats available.");
    }
  };

  
  const handleDecrement = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
    }
  };
  
  const handleTotalFare = () => {
    setTotalFare(bookingDetails.fare*seatCount);
  }
  const handleBookTicket = async () => {
    try{
      if (!passengerName || !passengerContact || !seatCount) {
        toast.error("All fields are required.");
        return;
      }
      let seatNo = [];
      for(let i = 1; i<= seatCount; i++){
        seatNo.push(i + bookingDetails.booked_seat);
      }
      const ticketDetails = {
        ...bookingDetails,
        passengerName : passengerName, 
        passengerContact : passengerContact,
        totalFare : totalFare,
        seatNo : seatNo,
        booked_seat : bookingDetails.booked_seat+seatCount
      }
    
      const response = await UserServices.postBookTicket(ticketDetails);
      if(response.error){
        toast.error(response.message);
        throw new Error(response.message);
      }
  
      toast.success(response.message);
    }catch(error){
      console.log(error);
      return;
    }finally{
      handleSearchBus();
      setFlag(false);
      setBookingDetails({});
      setPassengerContact('');
      setPassengerName('');
      setSeatCount(0);
      setTotalFare(0);
    }
  };

  const handleCancelBooking = () => {
    setFlag(false);
    setBookingDetails({});
    setPassengerContact('');
    setPassengerName('');
    setSeatCount(0);
    setTotalFare(0)
  }

  useEffect(()=>{
    handleTotalFare();
  }, [handleIncrement, handleDecrement]);

  return (
    <Fragment>
      <Modal isOpen={flag} onClose={() => setFlag(false)} backdropColor="#a0a0a0">
        <div className="shadow-2xl">
          <ModalHeader>
            <h2 className="text-2xl font-bold text-left px-4">Add Details</h2>
          </ModalHeader>
          <ModalBody>
            <div className="px-4 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Passenger Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-green-500"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Enter passenger name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Passenger Contact</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-green-500"
                  value={passengerContact}
                  onChange={(e) => setPassengerContact(e.target.value)}
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Select Numbers of Seats Seats</label>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={handleDecrement}
                    className="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                    disabled={seatCount <= 1}
                  >
                    -
                  </button>
                  <p className="text-lg font-bold">{seatCount}</p>
                  <button
                    onClick={handleIncrement}
                    className="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                    disabled={seatCount >= remainingSeats}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500">{`Max available seats: ${remainingSeats}`}</p>
                
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Total Fare</label>
                <p className="text-lg font-bold">{`₹${totalFare}`}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="px-4">
              <button
                onClick={handleCancelBooking}
                className="font-semibold bg-white border border-gray-500 text-gray-700 hover:bg-gray-50 rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleBookTicket}
                className="font-semibold bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-2 ml-2"
              >
                Confirm Booking
              </button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </Fragment>
  );
};

export default BookTicket;
