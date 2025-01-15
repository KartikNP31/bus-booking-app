const Bus = require("../model/Bus");
const City = require("../model/City");

class AdminActions {
  async addNewBus(reqData) {
    try {
      const trips = reqData.trips;
      const onwardBusDetails = {
        bus_no: reqData.busNo,
        source: reqData.source,
        destination: reqData.destination,
        distance: reqData.distance,
        fare: reqData.fare,
      };
      const returnBusDetails = {
        bus_no: reqData.busNo,
        source: reqData.destination,
        destination: reqData.source,
        distance: reqData.distance,
        fare: reqData.fare,
      };

      // Prepare bus trip data
      const busTrips = [];
      trips.forEach((i) => {
        if (i.departureTime && i.arrivalTime) {
          busTrips.push({
            departure_time: i.departureTime,
            arrival_time: i.arrivalTime,
            ...onwardBusDetails,
          });
        }
        if (i.returnDepartureTime && i.returnArrivalTime) {
          busTrips.push({
            departure_time: i.returnDepartureTime,
            arrival_time: i.returnArrivalTime,
            ...returnBusDetails,
          });
        }
      });

      // Insert bus trips into Bus collection
      const response = await Bus.insertMany(busTrips, { ordered: false }).catch(
        (err) => {
          if (err.code === 11000) {
            throw new Error("Duplicate bus entries detected.");
          }
          throw err;
        }
      );

      // Check if response is valid
      if (!response || response.length === 0) {
        return { error: true, message: "No buses were added.", status: 500 };
      }

      console.log("Buses added successfully:", response);

      // Prepare city data
      const cities = [
        { city_name: reqData.source },
        { city_name: reqData.destination },
      ];

      // Insert cities into City collection
      await City.insertMany(cities, { ordered: false }).catch((err) => {
        if (err.code === 11000) {
          console.log("Some cities already exist, ignoring duplicates.");
        } else {
          throw new Error("Error while adding cities: " + err.message);
        }
      });

      return { error: false, message: "Bus and cities added successfully.", status: 200 };
    } catch (error) {
      console.error("Error in addNewBus:", error.message);
      return { error: true, message: error.message, status: 500 };
    }
  }
}

module.exports = new AdminActions();
