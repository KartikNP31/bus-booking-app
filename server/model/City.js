const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city_name: { type: String, unique: true, required: true, index: true },
});

citySchema.index({ name: 1 });

const City = mongoose.model('City', citySchema);

module.exports = City;