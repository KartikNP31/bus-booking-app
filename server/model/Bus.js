const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  bus_no: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  fare: {
    type: Number,
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
  available_seats: {
    type: Number,
    default: 20,
    required: true
  },
});

busSchema.index(
  { bus_no: 1, source: 1, destination: 1, departure_time: 1, arrival_time: 1 },
  { unique: true }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;