import React, { useState } from "react";
import toast from "react-hot-toast";
import AdminServices from '../services/AdminServices.js'

const inputBoxStyle = "h-[2rem] mt-1 block w-full border border-gray-200 rounded-md";
const inputLabelStyle = "block text-sm font-medium text-gray-700";
const initialTrip = {
  departureTime: "",
  arrivalTime: "",
  returnDepartureTime: "",
  returnArrivalTime: "",
};
const initialBusDetails = {
  busNo: "",
  maxSeats: "",
  source: "",
  destination: "",
  distance: "",
  fare: "",
};


const AddNewBus = () => {
  const [busDetails, setBusDetails] = useState(initialBusDetails);
  const [trips, setTrips] = useState([initialTrip]);


  const handleBusDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTripChange = (index, e) => {
    const { name, value } = e.target;
    setTrips((prevTrips) =>
      prevTrips.map((trip, i) =>
        i === index ? { ...trip, [name]: value } : trip
      )
    );
  };

  const addTrip = () => {
    setTrips((prevTrips) => [...prevTrips, initialTrip]);
  };

  const handleAddBus = async () => {
    const data = {
      ...busDetails,
      trips,
    }

    try{
      const response = await AdminServices.postAddNewBus(data);
      // console.log("🚀 ~ handleAddBus ~ response:", response)
      if(!response){
        toast.error(response.message);
        throw new Error(response.error);
      }
      toast.success(response.message);

      setBusDetails(initialBusDetails);
      setTrips([initialTrip]);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className=" flex justify-center items-center">
      <div className="w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Bus</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={inputLabelStyle}>
                Bus No:
              </label>
              <input
                type="text"
                name="busNo"
                value={busDetails.busNo}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
            <div>
              <label className={inputLabelStyle}>
                Capacity of Bus / No. of Seats:
              </label>
              <input
                type="text"
                name="maxSeats"
                value={busDetails.maxSeats}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
            <div>
              <label className={inputLabelStyle}>
                Source:
              </label>
              <input
                type="text"
                name="source"
                value={busDetails.source}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
            <div>
              <label className={inputLabelStyle}>
                Destination:
              </label>
              <input
                type="text"
                name="destination"
                value={busDetails.destination}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
            <div>
              <label className={inputLabelStyle}>
                Distance (in km):
              </label>
              <input
                type="number"
                name="distance"
                value={busDetails.distance}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
            <div>
              <label className={inputLabelStyle}>
                Fare (in currency):
              </label>
              <input
                type="number"
                name="fare"
                value={busDetails.fare}
                onChange={handleBusDetailsChange}
                className={inputBoxStyle}
                required
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Trips</h3>
          {trips.map((trip, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md p-4 mb-4"
            >
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Trip {index + 1}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={inputLabelStyle}>
                    Departure Time:
                  </label>
                  <input
                    type="time"
                    name="departureTime"
                    value={trip.departureTime}
                    onChange={(e) => handleTripChange(index, e)}
                    className={inputBoxStyle}
                    required
                  />
                </div>
                <div>
                  <label className={inputLabelStyle}>
                    Arrival Time:
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={trip.arrivalTime}
                    onChange={(e) => handleTripChange(index, e)}
                    className={inputBoxStyle}
                    required
                  />
                </div>
                <div>
                  <label className={inputLabelStyle}>
                    Return Journey Departure Time:
                  </label>
                  <input
                    type="time"
                    name="returnDepartureTime"
                    value={trip.returnDepartureTime}
                    onChange={(e) => handleTripChange(index, e)}
                    className={inputBoxStyle}
                    required
                  />
                </div>
                <div>
                  <label className={inputLabelStyle}>
                    Return Journey Arrival Time:
                  </label>
                  <input
                    type="time"
                    name="returnArrivalTime"
                    value={trip.returnArrivalTime}
                    onChange={(e) => handleTripChange(index, e)}
                    className={inputBoxStyle}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Trip */}
          <button
            type="button"
            onClick={addTrip}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Another Trip
          </button>

          {/* Submit */}
          <div>
            <button
              type="button"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={handleAddBus}
            >
              Add Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBus;
