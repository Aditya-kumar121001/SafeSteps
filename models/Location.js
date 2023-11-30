// Assuming usage of Mongoose
const mongoose = require('mongoose');

// Define the Location Schema
const locationSchema = new mongoose.Schema({
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  timestamp: { type: Date, default: Date.now }
});

// Create a Location model based on the schema
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
