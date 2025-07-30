const config = require('../config');

// Validation middleware for user registration
const validateRegistration = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  // Validate email format
  if (!config.validation.email.pattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password strength
  if (password.length < config.validation.password.minLength) {
    return res.status(400).json({ 
      message: `Password must be at least ${config.validation.password.minLength} characters long` 
    });
  }

  if (config.validation.password.requireUppercase && !/[A-Z]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
  }

  if (config.validation.password.requireLowercase && !/[a-z]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
  }

  if (config.validation.password.requireNumbers && !/\d/.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one number' });
  }

  // Validate phone number if provided
  if (phone && !config.validation.phone.pattern.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  next();
};

// Validation middleware for hotel creation/update
const validateHotel = (req, res, next) => {
  const { name, location, description, price_per_night, rating, amenities } = req.body;

  // Check required fields
  if (!name || !location || !price_per_night) {
    return res.status(400).json({ message: 'Name, location, and price are required' });
  }

  // Validate price
  if (isNaN(price_per_night) || price_per_night <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  // Validate rating if provided
  if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
    return res.status(400).json({ message: 'Rating must be between 0 and 5' });
  }

  next();
};

// Validation middleware for booking creation
const validateBooking = (req, res, next) => {
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

  // Check required fields
  if (!hotel_id || !guest_name || !guest_email || !guest_phone || 
      !check_in_date || !check_out_date || !number_of_guests || !total_price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email
  if (!config.validation.email.pattern.test(guest_email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate phone
  if (!config.validation.phone.pattern.test(guest_phone)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  // Validate dates
  const checkIn = new Date(check_in_date);
  const checkOut = new Date(check_out_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  if (checkIn < today) {
    return res.status(400).json({ message: 'Check-in date cannot be in the past' });
  }

  if (checkOut <= checkIn) {
    return res.status(400).json({ message: 'Check-out date must be after check-in date' });
  }

  // Validate number of guests
  if (!Number.isInteger(number_of_guests) || number_of_guests < 1) {
    return res.status(400).json({ message: 'Number of guests must be a positive integer' });
  }

  // Validate price
  if (isNaN(total_price) || total_price <= 0) {
    return res.status(400).json({ message: 'Total price must be a positive number' });
  }

  next();
};

// Validation middleware for review creation
const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  // Check required fields
  if (!rating) {
    return res.status(400).json({ message: 'Rating is required' });
  }

  // Validate rating
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Validate comment length
  if (comment && comment.length > 1000) {
    return res.status(400).json({ message: 'Comment must be less than 1000 characters' });
  }

  next();
};

// Validation middleware for pagination
const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page && (!Number.isInteger(parseInt(page)) || parseInt(page) < 1)) {
    return res.status(400).json({ message: 'Page must be a positive integer' });
  }

  if (limit && (!Number.isInteger(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > config.pagination.maxLimit)) {
    return res.status(400).json({ 
      message: `Limit must be between 1 and ${config.pagination.maxLimit}` 
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateHotel,
  validateBooking,
  validateReview,
  validatePagination
}; 