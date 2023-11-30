const mongoose = require('mongoose');

// Geofence Schema
const geofenceSchema = new mongoose.Schema({
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  radius: { type: Number, required: true }
});

const Geofence = mongoose.model('Geofence', geofenceSchema);

module.exports = Geofence;
