const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  PNR_no : {
    type : String,
    unique : true,
    required : true,
  },
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusTrip',
    required: true,
  },
  bus_no : {
    type : String,
    required: true
  },
  source: {
    type: String,
    required: true,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  trip_date: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  seatNo: [{
    type: Number,
  }],
  totalFare : {
    type : String,
    required: true
  },
  passengerContact : {
    type : String,
    required: true
  },
  passengerName : {
    type : String,
    required: true
  },

});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
