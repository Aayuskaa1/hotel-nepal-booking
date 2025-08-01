const request = require('supertest');
const app = require('../app');
const sequelize = require('../database/testDb');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    try {
        await sequelize.close();
    } catch (error) {
        // Ignore errors when closing test database
    }
});

describe('Security Tests', () => {
  it('should prevent SQL Injection', async () => {
    const res = await request(app)
      .post('/products/create_product')
      .send({ productName: "' OR 1=1 --", price: 99.99, description: 'Hacked' });

    expect(res.status).toBe(400);
  });

  it('should prevent XSS attacks', async () => {
    const res = await request(app)
      .post('/products/create_product')
      .send({ productName: "<script>alert('XSS')</script>", price: 99.99, description: 'XSS Test' });

    expect(res.status).toBe(400);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});
