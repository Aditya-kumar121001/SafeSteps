const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const { request } = require('http');


// Middleware
app.use(express.json());
app.use(bodyParser.json())
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// MongoDB connection
const connectDB = require("./database/connection")
connectDB();

          
// Routes
const geofenceRoutes = require('./routes/geofenceRoutes');
const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Set the directory for serving static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.use('/api', geofenceRoutes);
app.use('/api', locationRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
