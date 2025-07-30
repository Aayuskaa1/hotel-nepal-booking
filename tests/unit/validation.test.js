const { 
  validateRegistration, 
  validateHotel, 
  validateBooking, 
  validateReview, 
  validatePagination 
} = require('../../middleware/validation');

describe('Validation Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('validateRegistration', () => {
    test('should pass with valid registration data', () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'TestPass123',
        phone: '+977-1234567890'
      };

      validateRegistration(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should fail with missing required fields', () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing password
      };

      validateRegistration(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Name, email, and password are required'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should fail with invalid email format', () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'TestPass123'
      };

      validateRegistration(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Invalid email format'
      });
    });

    test('should fail with weak password', () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak'
      };

      validateRegistration(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Password must be at least 6 characters long'
      });
    });
  });

  describe('validateHotel', () => {
    test('should pass with valid hotel data', () => {
      mockReq.body = {
        name: 'Test Hotel',
        location: 'Kathmandu',
        price_per_night: 10000,
        rating: 4.5
      };

      validateHotel(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should fail with missing required fields', () => {
      mockReq.body = {
        name: 'Test Hotel'
        // Missing location and price
      };

      validateHotel(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Name, location, and price are required'
      });
    });

    test('should fail with invalid price', () => {
      mockReq.body = {
        name: 'Test Hotel',
        location: 'Kathmandu',
        price_per_night: -1000
      };

      validateHotel(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Price must be a positive number'
      });
    });
  });

  describe('validateBooking', () => {
    test('should pass with valid booking data', () => {
      mockReq.body = {
        hotel_id: 1,
        guest_name: 'John Doe',
        guest_email: 'john@example.com',
        guest_phone: '+977-1234567890',
        check_in_date: '2024-02-01',
        check_out_date: '2024-02-03',
        number_of_guests: 2,
        total_price: 20000
      };

      validateBooking(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should fail with past check-in date', () => {
      mockReq.body = {
        hotel_id: 1,
        guest_name: 'John Doe',
        guest_email: 'john@example.com',
        guest_phone: '+977-1234567890',
        check_in_date: '2020-01-01',
        check_out_date: '2024-02-03',
        number_of_guests: 2,
        total_price: 20000
      };

      validateBooking(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Check-in date cannot be in the past'
      });
    });
  });

  describe('validateReview', () => {
    test('should pass with valid review data', () => {
      mockReq.body = {
        rating: 5,
        comment: 'Great hotel!'
      };

      validateReview(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should fail with invalid rating', () => {
      mockReq.body = {
        rating: 6,
        comment: 'Great hotel!'
      };

      validateReview(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Rating must be between 1 and 5'
      });
    });
  });

  describe('validatePagination', () => {
    test('should pass with valid pagination', () => {
      mockReq.query = {
        page: '1',
        limit: '10'
      };

      validatePagination(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should fail with invalid page number', () => {
      mockReq.query = {
        page: '0',
        limit: '10'
      };

      validatePagination(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Page must be a positive integer'
      });
    });
  });
}); 