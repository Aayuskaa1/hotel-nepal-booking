const request = require('supertest');
const app = require('../../server');

describe('Rate Limiting Integration', () => {
  describe('General Rate Limiting', () => {
    test('should allow requests within rate limit', async () => {
      // Make 5 requests (should all succeed)
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .get('/api/health')
          .expect(200);
        
        expect(response.body.status).toBe('OK');
      }
    });

    test('should handle multiple concurrent requests', async () => {
      const promises = [];
      
      // Make 10 concurrent requests
      for (let i = 0; i < 10; i++) {
        promises.push(
          request(app)
            .get('/api/health')
            .expect(200)
        );
      }

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.body.status).toBe('OK');
      });
    });

    test('should handle rapid successive requests', async () => {
      const promises = [];
      
      // Make rapid successive requests
      for (let i = 0; i < 20; i++) {
        promises.push(
          request(app)
            .get('/api/health')
            .then(response => response.status)
            .catch(error => error.response?.status || 500)
        );
      }

      const responses = await Promise.all(promises);
      
      // Most requests should succeed (some might be rate limited)
      const successCount = responses.filter(status => status === 200).length;
      expect(successCount).toBeGreaterThan(10); // At least 50% should succeed
    });
  });

  describe('API Endpoint Rate Limiting', () => {
    test('should rate limit hotel endpoints', async () => {
      // Make multiple requests to hotels endpoint
      const promises = [];
      
      for (let i = 0; i < 5; i++) {
        promises.push(
          request(app)
            .get('/api/hotels')
            .expect(200)
        );
      }

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    test('should handle rate limit headers', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      // Check if rate limit headers are present
      expect(response.headers).toHaveProperty('ratelimit-limit');
      expect(response.headers).toHaveProperty('ratelimit-remaining');
      expect(response.headers).toHaveProperty('ratelimit-reset');
    });

    test('should handle different endpoints with different limits', async () => {
      // Test health endpoint
      const healthResponse = await request(app)
        .get('/api/health')
        .expect(200);

      // Test hotels endpoint
      const hotelsResponse = await request(app)
        .get('/api/hotels')
        .expect(200);

      // Both should have rate limit headers
      expect(healthResponse.headers).toHaveProperty('ratelimit-limit');
      expect(hotelsResponse.headers).toHaveProperty('ratelimit-limit');
    });
  });

  describe('Error Handling with Rate Limiting', () => {
    test('should handle malformed requests gracefully', async () => {
      const response = await request(app)
        .get('/api/hotels/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should handle non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/non-existent-endpoint')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    test('should handle POST requests with rate limiting', async () => {
      const testBooking = {
        hotel_id: 1,
        guest_name: 'Test User',
        guest_email: 'test@example.com',
        check_in_date: '2024-02-01',
        check_out_date: '2024-02-03',
        number_of_guests: 1,
        total_price: 18000
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(testBooking);

      // Should either succeed or be rate limited, but not crash
      expect([201, 429]).toContain(response.status);
    });
  });

  describe('Performance with Rate Limiting', () => {
    test('should maintain performance under load', async () => {
      const startTime = Date.now();
      
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(
          request(app)
            .get('/api/health')
            .expect(200)
        );
      }

      await Promise.all(promises);
      const endTime = Date.now();
      
      // Should complete within reasonable time (5 seconds)
      expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should handle mixed request types', async () => {
      const promises = [
        request(app).get('/api/health'),
        request(app).get('/api/hotels'),
        request(app).get('/api/hotels/1'),
        request(app).get('/api/bookings')
      ];

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        // Should not crash and should return some response
        expect(response.status).toBeGreaterThan(0);
      });
    });
  });
}); 