import React, { useState } from "react";
import BookTicket from "./BookTicket";



const SearchResult = ({ busResults, tripsResult, source, destination, date, handleSearchBus}) => {

  const [flag, setFlag] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  
  
  const getBusTrip = (busId) => {
    const trip = tripsResult.find((trip) => trip.bus_id._id === busId);
    // console.log("🚀 ~ getBusTrip ~ trip:", trip)
    return trip;
  };

  const handleBooking = (bus,trip) => {
    setFlag(true);
    const details = {
      source: source,
      destination: destination,
      date: date,
      departure_time : bus.departure_time,
      arrival_time : bus.arrival_time,
      bus_id : bus._id,
      bus_no : bus.bus_no,
      available_seats : bus.available_seats,
      fare : bus.fare,
      
    }
    if(trip){
      details.trip_id = trip._id;
      details.booked_seat = trip.booked_seat;

    }else{
      details.booked_seat = 0;
    }
    setBookingDetails(details);

  }

  return (
    <div className="w-[90%] mt-20 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Available Buses</h2>
      {busResults.length === 0 ? (
        <p className="text-gray-600">
          No buses available for the selected route and date.
        </p>
      ) : (
        busResults.map((bus) => {
          const trip = getBusTrip(bus._id);
          return (
            <div
              key={bus._id}
              className="p-4 mb-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{`Bus No: ${bus.bus_no}`}</h3>
                <p>{`Route: ${bus.source} to ${bus.destination}`}</p>
                <p>{`Departure: ${bus.departure_time}`}</p>
                <p>{`Arrival: ${bus.arrival_time}`}</p>
                <p>{`Fare: ₹${bus.fare}`}</p>
              </div>
              <div
                className={`font-bold ${
                  bus.available_seats - (trip ? trip.booked_seat : 0) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Available Seats:{" "}
                {bus.available_seats - (trip ? trip.booked_seat : 0)}
              </div>
              {bus.available_seats - (trip ? trip.booked_seat : 0) > 0 ? (
                <button className="bg-green-500 text-white font-bold p-2 rounded hover:bg-green-700" 
                onClick={() => handleBooking(bus,trip)}
                >
                  Book Ticket
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })
      )}

      <BookTicket flag={flag} setFlag={setFlag} bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} handleSearchBus={handleSearchBus} />
    </div>

    
  );
};

export default SearchResult;
