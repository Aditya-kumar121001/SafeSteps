// Import Location model or database functions
const Location = require('../models/Location');

// Controller functions
const locationController = {
  getChildLocation: async (req, res) => {
    try {
      // Retrieve child's current location (assuming a single child for simplicity)
      const childLocation = await Location.findOne().sort({ timestamp: -1 });

      if (!childLocation) {
        return res.status(404).json({ success: false, message: 'Child location not found' });
      }0

      res.status(200).json({ success: true, data: childLocation });

      //In geofence or not
      
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getLocationHistory: async (req, res) => {
    try {
      const { start_date, end_date } = req.query;

      // Get location history within the specified timeframe
      const locationHistory = await Location.find({
        timestamp: { $gte: new Date(start_date), $lte: new Date(end_date) }
      }).sort({ timestamp: 1 });

      if (locationHistory.length === 0) {
        return res.status(404).json({ success: false, message: 'Location history not found' });
      }

      res.status(200).json({ success: true, data: locationHistory });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = locationController;
