const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app; 