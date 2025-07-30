const request = require('supertest');
const app = require('../../server');

describe('Bookings API', () => {
  describe('POST /api/bookings', () => {
    const validBooking = {
      hotel_id: 1,
      guest_name: 'John Doe',
      guest_email: 'john@example.com',
      guest_phone: '+977-1234567890',
      check_in_date: '2024-02-01',
      check_out_date: '2024-02-03',
      number_of_guests: 2,
      total_price: 36000
    };

    test('should create a booking with valid data', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .send(validBooking)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('hotel_id', validBooking.hotel_id);
      expect(response.body).toHaveProperty('guest_name', validBooking.guest_name);
      expect(response.body).toHaveProperty('guest_email', validBooking.guest_email);
    });

    test('should return 400 for missing required fields', async () => {
      const invalidBooking = {
        hotel_id: 1,
        guest_name: 'John Doe'
        // Missing other required fields
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for invalid email format', async () => {
      const invalidBooking = {
        ...validBooking,
        guest_email: 'invalid-email'
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for past check-in date', async () => {
      const invalidBooking = {
        ...validBooking,
        check_in_date: '2020-01-01'
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for check-out before check-in', async () => {
      const invalidBooking = {
        ...validBooking,
        check_in_date: '2024-02-03',
        check_out_date: '2024-02-01'
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 400 for invalid number of guests', async () => {
      const invalidBooking = {
        ...validBooking,
        number_of_guests: 0
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 404 for non-existent hotel', async () => {
      const invalidBooking = {
        ...validBooking,
        hotel_id: 999
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bookings', () => {
    test('should return bookings list', async () => {
      const response = await request(app)
        .get('/api/bookings')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return bookings with hotel information', async () => {
      const response = await request(app)
        .get('/api/bookings')
        .expect(200);

      if (response.body.length > 0) {
        const booking = response.body[0];
        expect(booking).toHaveProperty('hotel_name');
        expect(booking).toHaveProperty('hotel_location');
      }
    });
  });
}); 