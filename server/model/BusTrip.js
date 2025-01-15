const mongoose = require('mongoose');

const busTripSchema = new mongoose.Schema({
  bus_id :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Bus',
    required : true,
  },
  source: {
    type: String,
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
  booked_seat: {
    type: Number,
    default: 0,
  },
});

const BusTrip = mongoose.model('BusTrip', busTripSchema);

module.exports = BusTrip;
