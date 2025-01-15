import React from 'react'

const PassengerCard = ({PNRDetails}) => {
  const seats = PNRDetails.seatNo;
  const seatString = seats.join(", ");
  return (
    <div className="w-full mx-auto bg-white items-center shadow-lg rounded-lg overflow-hidden">
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">PNR Details</h2>
        <p className="text-gray-600 mt-2">Name: {PNRDetails.passengerName}</p>
        <p className="text-gray-600 mt-2">Contact: {PNRDetails.passengerContact}</p>

        <div className="mt-4">
          <p className="text-gray-600">
            <strong>PNR Number:</strong> {PNRDetails.PNR_no}
          </p>
          <p className="text-gray-600">
            <strong>Bus Number:</strong> {PNRDetails.bus_no}
          </p>
          <p className="text-gray-600">
            <strong>Source:</strong> {PNRDetails.source}
          </p>
          <p className="text-gray-600">
            <strong>Destination:</strong> {PNRDetails.destination}
          </p>
          <p className="text-gray-600">
            <strong>Trip Date:</strong> {PNRDetails.trip_date}
          </p>
          <p className="text-gray-600">
            <strong>Departure Time:</strong> {PNRDetails.departure_time}
          </p>
          <p className="text-gray-600">
            <strong>Arrival Time:</strong> {PNRDetails.arrival_time}
          </p>
          <p className="text-gray-600">
            <strong>Seat Numbers:</strong> {seatString}
          </p>
          <p className="text-gray-600">
            <strong>Total Fare:</strong> ₹{PNRDetails.totalFare}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PassengerCard