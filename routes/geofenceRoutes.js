const express = require('express');
const router = express.Router();
const geofenceController = require('../controllers/geofenceController');

// Routes for geofence operations
router.post('/geofences', geofenceController.createGeofence);
router.put('/geofences/:geofenceId', geofenceController.updateGeofence);
router.delete('/geofences/:geofenceId', geofenceController.deleteGeofence);
router.post('/geofence/isinside', geofenceController.pointInGeofence)

module.exports = router;
