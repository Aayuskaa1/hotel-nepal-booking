const request = require('supertest');
const app = require('../../server');

describe('Health Check API', () => {
  test('GET /api/health should return 200 and server status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('message');
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toContain('Hotel Nepal API');
  });

  test('Health check should respond quickly', async () => {
    const startTime = Date.now();
    await request(app).get('/api/health');
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test('Health check should return JSON content type', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/);
  });

  test('Health check should handle multiple requests', async () => {
    const promises = [];
    
    for (let i = 0; i < 5; i++) {
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
}); 