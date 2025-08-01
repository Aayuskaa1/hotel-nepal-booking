require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

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

// Fallback data storage
const fallbackHotels = [
  {
    id: 1,
    name: 'Himalayan Grand Hotel',
    location: 'Kathmandu',
    description: 'Luxury 5-star hotel in the heart of Kathmandu with stunning views of the Himalayas',
    price_per_night: 18000, // NPR (approximately $150 USD)
    rating: 4.5,
    image: '/images/Image 5.jpeg'
  },
  {
    id: 2,
    name: 'Everest View Lodge',
    location: 'Namche Bazaar',
    description: 'Perfect base for Everest trekkers with panoramic mountain views',
    price_per_night: 9600, // NPR (approximately $80 USD)
    rating: 4.2,
    image: '/images/Image 7.jpeg'
  },
  {
    id: 3,
    name: 'Pokhara Lake Resort',
    location: 'Pokhara',
    description: 'Beautiful lakeside resort with stunning views of Phewa Lake',
    price_per_night: 14400, // NPR (approximately $120 USD)
    rating: 4.7,
    image: '/images/Image 8.jpeg'
  },
  {
    id: 4,
    name: 'Chitwan Jungle Lodge',
    location: 'Chitwan National Park',
    description: 'Eco-friendly lodge in the heart of Chitwan National Park with wildlife safaris',
    price_per_night: 11400, // NPR (approximately $95 USD)
    rating: 4.3,
    image: '/images/Image 3.jpeg'
  },
  {
    id: 5,
    name: 'Bandipur Heritage Hotel',
    location: 'Bandipur',
    description: 'Historic hotel in the medieval town of Bandipur with traditional architecture',
    price_per_night: 9000, // NPR (approximately $75 USD)
    rating: 4.1,
    image: '/images/Image 4.jpeg'
  },
  {
    id: 6,
    name: 'Gokyo Lake Lodge',
    location: 'Gokyo Valley',
    description: 'High-altitude lodge near the famous Gokyo Lakes for serious trekkers',
    price_per_night: 7200, // NPR (approximately $60 USD)
    rating: 4.0,
    image: '/images/Image 6.jpeg'
  }
];

// In-memory user storage for fallback
const fallbackUsers = [];
let nextUserId = 1;

// Get all hotels
app.get('/api/hotels', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, location, description, price_per_night, rating, image 
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

// Fallback booking storage
let fallbackBookings = [
  {
    id: 1,
    hotel_id: 1,
    guest_name: 'John Doe',
    guest_email: 'john@example.com',
    guest_phone: '+977-1234567890',
    check_in_date: '2024-02-01',
    check_out_date: '2024-02-03',
    number_of_guests: 2,
    total_price: 36000,
    created_at: '2024-01-15T10:00:00.000Z',
    status: 'confirmed'
  },
  {
    id: 2,
    hotel_id: 2,
    guest_name: 'Jane Smith',
    guest_email: 'jane@example.com',
    guest_phone: '+977-9876543210',
    check_in_date: '2024-03-15',
    check_out_date: '2024-03-18',
    number_of_guests: 1,
    total_price: 45000,
    created_at: '2024-02-20T14:30:00.000Z',
    status: 'pending'
  }
];

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
    console.log('Using fallback booking storage');
    
    // Create booking with fallback data
    const newBooking = {
      id: fallbackBookings.length + 1,
      hotel_id: parseInt(hotel_id),
      guest_name,
      guest_email,
      guest_phone,
      check_in_date,
      check_out_date,
      number_of_guests: parseInt(number_of_guests),
      total_price: parseFloat(total_price),
      created_at: new Date().toISOString(),
      status: 'confirmed'
    };
    
    fallbackBookings.push(newBooking);
    res.status(201).json(newBooking);
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
    console.log('Using fallback booking data');
    
    // Return fallback bookings with hotel information
    const bookingsWithHotelInfo = fallbackBookings.map(booking => {
      const hotel = fallbackHotels.find(h => h.id === booking.hotel_id) || {
        name: 'Unknown Hotel',
        location: 'Unknown Location'
      };
      
      return {
        ...booking,
        hotel_name: hotel.name,
        hotel_location: hotel.location
      };
    });
    
    res.json(bookingsWithHotelInfo);
  }
});

// Create new hotel (Admin only)
app.post('/api/hotels', async (req, res) => {
  const {
    name,
    location,
    description,
    price_per_night,
    rating,
    image,
    address,
    city,
    postal_code,
    phone,
    email
  } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO hotels 
      (name, location, description, price_per_night, rating, image, address, city, postal_code, phone, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [name, location, description, price_per_night, rating, image, address, city, postal_code, phone, email]);

    const locationDetails = address 
      ? `${location} (${address}${city && city !== location ? `, ${city}` : ''})`
      : location;
    
    res.status(201).json({
      ...result.rows[0],
      message: `Hotel "${name}" has been successfully added to ${locationDetails}!`
    });
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ error: 'Failed to create hotel' });
  }
});

// Update hotel
app.put('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    description,
    price_per_night,
    rating,
    image,
    address,
    city,
    postal_code,
    phone,
    email
  } = req.body;

  try {
    const result = await pool.query(`
      UPDATE hotels 
      SET name = $1, location = $2, description = $3, price_per_night = $4, 
          rating = $5, image = $6, address = $7, city = $8, 
          postal_code = $9, phone = $10, email = $11, updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *
    `, [name, location, description, price_per_night, rating, image, address, city, postal_code, phone, email, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const locationDetails = address 
      ? `${location} (${address}${city && city !== location ? `, ${city}` : ''})`
      : location;
    
    res.json({
      ...result.rows[0],
      message: `Hotel "${name}" has been successfully updated in ${locationDetails}!`
    });
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ error: 'Failed to update hotel' });
  }
});

// Delete hotel
app.delete('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM hotels WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const deletedHotel = result.rows[0];
    const locationDetails = deletedHotel.address 
      ? `${deletedHotel.location} (${deletedHotel.address}${deletedHotel.city && deletedHotel.city !== deletedHotel.location ? `, ${deletedHotel.city}` : ''})`
      : deletedHotel.location;
    
    res.json({ 
      message: `Hotel "${deletedHotel.name}" has been successfully removed from ${locationDetails}!`,
      deletedHotel: deletedHotel
    });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
});

// User registration
app.post('/api/users/register', async (req, res) => {
  console.log('Registration request received:', req.body);
  
  const {
    firstName,
    lastName,
    email,
    password,
    phone
  } = req.body;

  console.log('Extracted data:', { firstName, lastName, email, phone, passwordLength: password?.length });

  try {
    if (dbConnected) {
      console.log('Using database connection');
      // Check if user already exists
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log('Password hashed successfully');

      // Create user
      const result = await pool.query(`
        INSERT INTO users 
        (first_name, last_name, email, password, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first_name, last_name, email, phone, created_at
      `, [firstName, lastName, email, hashedPassword, phone]);

      console.log('User created in database:', result.rows[0]);

      res.status(201).json({
        message: 'User registered successfully!',
        user: result.rows[0]
      });
    } else {
      console.log('Using fallback storage');
      // Fallback: Check if user already exists
      const existingUser = fallbackUsers.find(user => user.email === email);
      if (existingUser) {
        console.log('User already exists in fallback storage:', email);
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log('Password hashed successfully for fallback');

      // Create user in memory
      const newUser = {
        id: nextUserId++,
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        phone,
        created_at: new Date().toISOString()
      };

      fallbackUsers.push(newUser);
      console.log('User created in fallback storage:', newUser);

      res.status(201).json({
        message: 'User registered successfully! (Using fallback storage)',
        user: {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          phone: newUser.phone,
          created_at: newUser.created_at
        }
      });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to register user: ' + error.message });
  }
});

// User login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (dbConnected) {
      // Find user by email
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = result.rows[0];

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalCode: user.postal_code
        }
      });
    } else {
      // Fallback: Find user by email
      const user = fallbackUsers.find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful! (Using fallback storage)',
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalCode: user.postal_code
        }
      });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get user profile
app.get('/api/users/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (dbConnected) {
      const result = await pool.query('SELECT id, first_name, last_name, email, phone, address, city, postal_code, created_at FROM users WHERE id = $1', [decoded.userId]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: result.rows[0].id,
          firstName: result.rows[0].first_name,
          lastName: result.rows[0].last_name,
          email: result.rows[0].email,
          phone: result.rows[0].phone,
          address: result.rows[0].address,
          city: result.rows[0].city,
          postalCode: result.rows[0].postal_code,
          createdAt: result.rows[0].created_at
        }
      });
    } else {
      // Fallback: Find user in memory
      const user = fallbackUsers.find(u => u.id === decoded.userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalCode: user.postal_code,
          createdAt: user.created_at
        }
      });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    dbConnected: dbConnected
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hotel Nepal API is running' });
});

// Image upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl,
      filename: req.file.filename,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
