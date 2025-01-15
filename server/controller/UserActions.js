const BusTrip = require("../model/BusTrip");
const City = require("../model/City");
const Bus = require("../model/Bus");
const crypto = require("crypto");
const { error } = require("console");
const Passenger = require("../model/passenger");

class UserActions {

  async getAllCities() {
    try {
      const response = await City.find();
      if (!response) {
        return { error: true, message: "No cities found, please try again later.", status: 404 };
      }

      return { error: false, message: 'Cities fetched successfully', status: 200, data: response };
    } catch (error) {
      return { error: true, message: 'Internal server error', status: 500 }
    }
  }


  async getSearchBus(reqData) {
    const { source, destination, date } = reqData;

    try {
      const busResults = await Bus.find({ source, destination });
      const tripsResult = await BusTrip.find({ source, destination, trip_date: date }).populate('bus_id');

      if (busResults.length === 0) {
        return { error: true, message: "No Buses available on this route", status: 404 };
      }

      return { error: false, message: 'Buses fetched successfully', status: 200, data: { busResults, tripsResult } };
    } catch (error) {
      return { error: true, message: 'Internal server error', status: 500 }
    }
  }
  
  async getPNR(reqData) {
    const { PNR} = reqData;

    try {
      const response = await Passenger.findOne({PNR_no : PNR})

      if (!response) {
        return { error: true, message: "No Buses available on this route", status: 400 };
      }

      return { error: false, message: 'PNR fetched successfully', status: 200, data: response  };
    } catch (error) {
      return { error: true, message: 'Internal server error', status: 500 }
    }
  }

  async postBookTicket(reqData) {
    try {
      const { source,
        destination,
        date,
        departure_time,
        arrival_time,
        bus_id,
        bus_no,
        passengerName,
        passengerContact,
        totalFare,
        seatNo,
        booked_seat,
        trip_id,
        // fare,
      } = reqData;

      const tripData = {
        bus_id : bus_id,
        source : source,
        destination : destination,
        booked_seat : booked_seat,
        trip_date : date
      }
      
      let updateTrip;
      if(!trip_id){
        updateTrip = new BusTrip(tripData);
        await updateTrip.save();
      }else{
        updateTrip = await BusTrip.findOneAndUpdate({ _id: trip_id }, tripData, {new : true, upsert : true});
      }

      if(!updateTrip){
        return {error : true, status : 500, message : "Internal Server Error"}
      }
      
      const combineSeats = seatNo.join("-");
      const uniqueString = `${trip_id}${combineSeats}`;
      const hash = crypto.createHash("MD5").update(uniqueString).digest("hex");
      const pnr = `${hash.substring(0,8)}${bus_no}`.toUpperCase();
      const passengerData = {
        PNR_no : pnr,
        trip_id : updateTrip._id,
        bus_no : bus_no,
        source : source,
        destination : destination,
        trip_date : date,
        seatNo : seatNo,
        passengerContact : passengerContact,
        passengerName : passengerName,
        totalFare : totalFare,
        arrival_time : arrival_time,
        departure_time : departure_time,
      }

      const addPassenger = new Passenger(passengerData);
      await addPassenger.save();
      // console.log("🚀 ~ UserActions ~ postBookTicket ~ addPassenger:", addPassenger)
      if(!addPassenger){
        return {error : true, status : 500, message : "Internal Server Error"}
      }

      return {error : false, status : 200, message : `Ticket successfully booked : PNR - ${addPassenger.PNR_no}`, data : addPassenger}

    } catch (error) {
      return { error: true, message: 'Internal server error', status: 500 }
    }
  }


}

module.exports = new UserActions();
