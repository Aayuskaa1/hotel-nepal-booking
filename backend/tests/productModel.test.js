const Product = require('../model/Product');
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

describe('Product Model', () => {
  it('should create a product', async () => {
    const product = await Product.create({
      productName: 'New Product',
      price: 49.99,
      description: 'A new test product',
      productImage: 'new.jpg',
    });

    expect(product.productName).toBe('New Product');
    expect(product.price).toBe(49.99);
    expect(product.description).toBe('A new test product');
    expect(product.productImage).toBe('new.jpg');
  });

  it('should require a product name and price', async () => {
    await expect(Product.create({})).rejects.toThrow();
  });
});

