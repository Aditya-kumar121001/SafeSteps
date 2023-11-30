// Import Geofence model or database functions
const Geofence = require('../models/Geofence');

// Controller functions
// app.post('/saveCoordinates', (req, res) => {
//   const receivedCoordinates = req.body.coordinates;

//   // Assuming you want to simply log the coordinates
//   console.log('Received Coordinates:', receivedCoordinates);

//   // Perform actions with the coordinates (save to a database, process, etc.)

//   // Send a response (you can customize this as needed)
//   res.status(200).send('Coordinates received successfully!');
// });


// Usage example with provided coordinates
const userCoords = '21.252819,81.631363';

const geofenceController = {
  pointInGeofence: async (req,res) => {
    try{
      const geofenceCoords = req.body.coordinates;
      console.log(geofenceCoords)

      const userLat = parseFloat(userCoords.split(',')[0]);
      const userLng = parseFloat(userCoords.split(',')[1]);

      // Convert geofence coordinates to numeric values
      const polygonCoords = geofenceCoords.map(coord => {
        const [lat, lng] = coord.split(',').map(parseFloat);
        return { lat, lng };
      });

      let inside = false;

      for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
        const xi = polygonCoords[i].lat;
        const yi = polygonCoords[i].lng;
        const xj = polygonCoords[j].lat;
        const yj = polygonCoords[j].lng;

        const intersect = ((yi > userLng) !== (yj > userLng)) &&
            (userLat < ((xj - xi) * (userLng - yi)) / (yj - yi) + xi);

        if (intersect) {
            inside = !inside;
        }
      }
      if(inside)
        console.log(`user is inside the fence`)
      else 
        console.log(`user is outside the fence`)
      res.status(200).json({success: true, data: `user is ${inside}`})
    } catch(err){
        res.status(500).json({success: false, error:err.message})
    }
  },

  createGeofence: async (req, res) => {
    try {
      const receivedCoordinates = req.body.coordinates;
      console.log(receivedCoordinates)

      res.status(201).json({ success: true, data: newGeofence });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  updateGeofence: async (req, res) => {
    try {
      const geofenceId = req.params.geofenceId;
      const { center, radius } = req.body;

      // Update existing geofence by ID
      const updatedGeofence = await Geofence.findByIdAndUpdate(
        geofenceId,
        { center, radius },
        { new: true }
      );

      if (!updatedGeofence) {
        return res.status(404).json({ success: false, message: 'Geofence not found' });
      }

      res.status(200).json({ success: true, data: updatedGeofence });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  deleteGeofence: async (req, res) => {
    try {
      const geofenceId = req.params.geofenceId;

      // Delete geofence by ID
      const deletedGeofence = await Geofence.findByIdAndDelete(geofenceId);

      if (!deletedGeofence) {
        return res.status(404).json({ success: false, message: 'Geofence not found' });
      }

      res.status(200).json({ success: true, data: deletedGeofence });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = geofenceController;
