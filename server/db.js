const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL = process.env.MONGO_URL;
const dbConnection = async () => {
  await mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  })
}

module.exports = dbConnection;
