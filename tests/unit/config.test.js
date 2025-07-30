const config = require('../../config');

describe('Configuration System', () => {
  test('should load database configuration', () => {
    expect(config.database).toBeDefined();
    expect(config.database).toHaveProperty('user');
    expect(config.database).toHaveProperty('host');
    expect(config.database).toHaveProperty('database');
    expect(config.database).toHaveProperty('password');
    expect(config.database).toHaveProperty('port');
  });

  test('should load JWT configuration', () => {
    expect(config.jwt).toBeDefined();
    expect(config.jwt).toHaveProperty('secret');
    expect(config.jwt).toHaveProperty('expiresIn');
    expect(config.jwt.expiresIn).toBe('24h');
  });

  test('should load server configuration', () => {
    expect(config.server).toBeDefined();
    expect(config.server).toHaveProperty('port');
    expect(config.server).toHaveProperty('nodeEnv');
    expect(typeof config.server.port).toBe('string');
  });

  test('should load validation rules', () => {
    expect(config.validation).toBeDefined();
    expect(config.validation).toHaveProperty('password');
    expect(config.validation).toHaveProperty('email');
    expect(config.validation).toHaveProperty('phone');
  });

  test('should have password validation rules', () => {
    expect(config.validation.password).toHaveProperty('minLength');
    expect(config.validation.password).toHaveProperty('requireUppercase');
    expect(config.validation.password).toHaveProperty('requireLowercase');
    expect(config.validation.password).toHaveProperty('requireNumbers');
    expect(config.validation.password.minLength).toBe(6);
  });

  test('should have email validation pattern', () => {
    expect(config.validation.email).toHaveProperty('pattern');
    expect(config.validation.email.pattern).toBeInstanceOf(RegExp);
  });

  test('should have phone validation pattern', () => {
    expect(config.validation.phone).toHaveProperty('pattern');
    expect(config.validation.phone.pattern).toBeInstanceOf(RegExp);
  });

  test('should load pagination defaults', () => {
    expect(config.pagination).toBeDefined();
    expect(config.pagination).toHaveProperty('defaultPage');
    expect(config.pagination).toHaveProperty('defaultLimit');
    expect(config.pagination).toHaveProperty('maxLimit');
    expect(config.pagination.defaultPage).toBe(1);
    expect(config.pagination.defaultLimit).toBe(10);
    expect(config.pagination.maxLimit).toBe(100);
  });

  test('should load upload configuration', () => {
    expect(config.upload).toBeDefined();
    expect(config.upload).toHaveProperty('maxFileSize');
    expect(config.upload).toHaveProperty('allowedTypes');
    expect(config.upload).toHaveProperty('uploadPath');
    expect(Array.isArray(config.upload.allowedTypes)).toBe(true);
  });

  test('should have reasonable default values', () => {
    expect(config.database.port).toBe('5432');
    expect(config.database.host).toBe('localhost');
    expect(config.server.nodeEnv).toBe('development');
  });

  test('should handle environment variables', () => {
    // Test that config can load from environment
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';
    
    // Reload config to test environment variable handling
    delete require.cache[require.resolve('../../config')];
    const testConfig = require('../../config');
    
    expect(testConfig.server.nodeEnv).toBe('test');
    
    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });
}); 