# Backend Testing Documentation

## Overview
This directory contains all the backend tests for the Hotel Nepal Booking application. The tests have been consolidated from the separate `BackendTesting` folder into the main backend structure.

## Test Structure

### Test Categories
- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test how different components work together
- **API Tests**: Test the HTTP endpoints and responses
- **Security Tests**: Test security features and vulnerabilities

### Test Files
- `productController.test.js` - Tests for product controller functions
- `productModel.test.js` - Tests for Product model operations
- `productRoutes.test.js` - Tests for product API endpoints
- `security.test.js` - Security vulnerability tests
- `api/` - API endpoint tests
  - `bookings.test.js` - Booking API tests
  - `hotels.test.js` - Hotel API tests
  - `health.test.js` - Health check API tests
- `unit/` - Unit tests
  - `config.test.js` - Configuration tests
  - `validation.test.js` - Validation middleware tests
- `integration/` - Integration tests
  - `rateLimiter.test.js` - Rate limiting tests
- `utils/` - Utility tests
  - `logger.test.js` - Logger utility tests

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Categories
```bash
# Run only unit tests
npm test -- --testPathPatterns=unit

# Run only API tests
npm test -- --testPathPatterns=api

# Run only product-related tests
npm test -- --testPathPatterns=product
```

### Run Individual Test Files
```bash
npm test -- --testPathPatterns=productController.test.js
```

## Test Configuration

### Jest Configuration
- Test environment: Node.js
- Coverage reporting enabled
- SQLite in-memory database for testing
- 10-second timeout for tests
- Force exit after tests complete

### Database Setup
- Uses SQLite in-memory database for testing
- Database is automatically created and destroyed for each test run
- No external database dependencies required

### Test Dependencies
- Jest - Testing framework
- Supertest - HTTP testing
- Sequelize-mock - Database mocking
- SQLite3 - In-memory database

## Coverage Report
Tests provide code coverage reporting showing:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Notes
- All tests run in isolation
- Database is reset between test suites
- Console output is suppressed during tests
- Tests use environment variable `NODE_ENV=test`
