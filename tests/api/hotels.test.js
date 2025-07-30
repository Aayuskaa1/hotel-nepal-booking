const request = require('supertest');
const app = require('../../server');

describe('Hotels API', () => {
  describe('GET /api/hotels', () => {
    test('should return all hotels', async () => {
      const response = await request(app)
        .get('/api/hotels')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return hotels with required fields', async () => {
      const response = await request(app)
        .get('/api/hotels')
        .expect(200);

      const hotel = response.body[0];
      expect(hotel).toHaveProperty('id');
      expect(hotel).toHaveProperty('name');
      expect(hotel).toHaveProperty('location');
      expect(hotel).toHaveProperty('description');
      expect(hotel).toHaveProperty('price_per_night');
      expect(hotel).toHaveProperty('rating');
      expect(hotel).toHaveProperty('amenities');
      expect(hotel).toHaveProperty('image');
    });

    test('should filter hotels by location', async () => {
      const response = await request(app)
        .get('/api/hotels?location=Kathmandu')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(hotel => {
        expect(hotel.location.toLowerCase()).toContain('kathmandu');
      });
    });

    test('should filter hotels by minimum rating', async () => {
      const response = await request(app)
        .get('/api/hotels?minRating=4.0')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(hotel => {
        expect(parseFloat(hotel.rating)).toBeGreaterThanOrEqual(4.0);
      });
    });

    test('should filter hotels by price range', async () => {
      const response = await request(app)
        .get('/api/hotels?minPrice=5000&maxPrice=15000')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(hotel => {
        expect(hotel.price_per_night).toBeGreaterThanOrEqual(5000);
        expect(hotel.price_per_night).toBeLessThanOrEqual(15000);
      });
    });

    test('should search hotels by name or description', async () => {
      const response = await request(app)
        .get('/api/hotels?search=Himalayan')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(hotel => {
        const searchText = hotel.name + ' ' + hotel.description;
        expect(searchText.toLowerCase()).toContain('himalayan');
      });
    });
  });

  describe('GET /api/hotels/:id', () => {
    test('should return a specific hotel by ID', async () => {
      const response = await request(app)
        .get('/api/hotels/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('location');
    });

    test('should return 404 for non-existent hotel', async () => {
      const response = await request(app)
        .get('/api/hotels/999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Hotel not found');
    });

    test('should return 400 for invalid hotel ID', async () => {
      await request(app)
        .get('/api/hotels/invalid')
        .expect(400);
    });
  });
}); 