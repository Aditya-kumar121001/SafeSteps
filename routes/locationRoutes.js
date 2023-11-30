const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Routes for location operations
router.get('/child/location', locationController.getChildLocation);
router.get('/child/location/history', locationController.getLocationHistory);

module.exports = router;
