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

describe('Product API Endpoints', () => {
  let productId;

  it('should create a product', async () => {
    const res = await request(app)
      .post('/products/create_product')
      .send({ productName: 'Test Product', price: 99.99, description: 'Test Desc' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/products/show_product');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a product by ID', async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/products/${productId}`)
      .send({ productName: 'Updated Product', price: 89.99 });

    expect(res.status).toBe(200);
    expect(res.body.productName).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });
});
