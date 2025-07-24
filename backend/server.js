require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'hotel_nepal',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Test database connection (optional)
let dbConnected = false;
pool.connect((err, client, release) => {
  if (err) {
    console.error('PostgreSQL connection failed - API will work with fallback data');
    console.log('Note: Install and start PostgreSQL for full functionality');
    dbConnected = false;
  } else {
    console.log('Connected to PostgreSQL database');
    dbConnected = true;
    release();
  }
});

// Routes

// Fallback hotel data
const fallbackHotels = [
  {
    id: 1,
    name: 'Himalayan Grand Hotel',
    location: 'Kathmandu',
    description: 'Luxury 5-star hotel in the heart of Kathmandu with stunning views of the Himalayas',
    price_per_night: 18000, // NPR (approximately $150 USD)
    rating: 4.5,
    amenities: 'WiFi,Pool,Spa,Restaurant,Room Service',
    image: '/images/Image 5.jpeg'
  },
  {
    id: 2,
    name: 'Everest View Lodge',
    location: 'Namche Bazaar',
    description: 'Perfect base for Everest trekkers with panoramic mountain views',
    price_per_night: 9600, // NPR (approximately $80 USD)
    rating: 4.2,
    amenities: 'WiFi,Restaurant,Heating,Mountain View',
    image: '/images/Image 7.jpeg'
  },
  {
    id: 3,
    name: 'Pokhara Lake Resort',
    location: 'Pokhara',
    description: 'Beautiful lakeside resort with stunning views of Phewa Lake',
    price_per_night: 14400, // NPR (approximately $120 USD)
    rating: 4.7,
    amenities: 'WiFi,Pool,Spa,Restaurant,Lake View',
    image: '/images/Image 8.jpeg'
  },
  {
    id: 4,
    name: 'Chitwan Jungle Lodge',
    location: 'Chitwan National Park',
    description: 'Eco-friendly lodge in the heart of Chitwan National Park with wildlife safaris',
    price_per_night: 11400, // NPR (approximately $95 USD)
    rating: 4.3,
    amenities: 'WiFi,Restaurant,Safari Tours,Cultural Shows',
    image: '/images/Image 3.jpeg'
  },
  {
    id: 5,
    name: 'Bandipur Heritage Hotel',
    location: 'Bandipur',
    description: 'Historic hotel in the medieval town of Bandipur with traditional architecture',
    price_per_night: 9000, // NPR (approximately $75 USD)
    rating: 4.1,
    amenities: 'WiFi,Restaurant,Heritage Tours,Mountain View',
    image: '/images/Image 4.jpeg'
  },
  {
    id: 6,
    name: 'Gokyo Lake Lodge',
    location: 'Gokyo Valley',
    description: 'High-altitude lodge near the famous Gokyo Lakes for serious trekkers',
    price_per_night: 7200, // NPR (approximately $60 USD)
    rating: 4.0,
    amenities: 'WiFi,Restaurant,Heating,Mountain View',
    image: '/images/Image 6.jpeg'
  }
];

// Get all hotels
app.get('/api/hotels', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, location, description, price_per_night, rating, amenities, image 
      FROM hotels 
      ORDER BY rating DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.log('Using fallback hotel data (database not connected)');
    res.json(fallbackHotels);
  }
});

// Get hotel by ID
app.get('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log('Using fallback hotel data for ID:', id);
    const hotel = fallbackHotels.find(h => h.id == id);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  const {
    hotel_id,
    guest_name,
    guest_email,
    guest_phone,
    check_in_date,
    check_out_date,
    number_of_guests,
    total_price
  } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO bookings 
      (hotel_id, guest_name, guest_email, guest_phone, check_in_date, check_out_date, number_of_guests, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [hotel_id, guest_name, guest_email, guest_phone, check_in_date, check_out_date, number_of_guests, total_price]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, h.name as hotel_name, h.location as hotel_location
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      ORDER BY b.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hotel Nepal API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
