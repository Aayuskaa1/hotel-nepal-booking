# Hotel Nepal Booking - Test Suite

Comprehensive testing suite for the Hotel Nepal Booking backend API.

## 📁 Test Structure

```
tests/
├── api/                    # API endpoint tests
│   ├── health.test.js     # Health check tests
│   ├── hotels.test.js     # Hotel API tests
│   └── bookings.test.js   # Booking API tests
├── unit/                   # Unit tests
│   ├── validation.test.js # Validation middleware tests
│   └── config.test.js     # Configuration tests
├── integration/            # Integration tests
│   └── rateLimiter.test.js # Rate limiting tests
├── utils/                  # Utility tests
│   └── logger.test.js     # Logging system tests
├── test-runner.js         # Test runner script
└── README.md              # This file
```

## 🚀 Quick Start

### Install Test Dependencies
```bash
npm install --save-dev jest supertest
```

### Run All Tests
```bash
node tests/test-runner.js
```

### Run Specific Test Categories
```bash
# Unit tests only
node tests/test-runner.js --unit

# API tests only
node tests/test-runner.js --api

# Integration tests only
node tests/test-runner.js --integration

# Utility tests only
node tests/test-runner.js --utils
```

### Generate Test Report
```bash
node tests/test-runner.js --report
```

## 🧪 Test Categories

### 1. API Tests (`tests/api/`)
Tests for all API endpoints and their responses.

**Files:**
- `health.test.js` - Health check endpoint testing
- `hotels.test.js` - Hotel CRUD operations and filtering
- `bookings.test.js` - Booking creation and management

**Coverage:**
- ✅ HTTP status codes
- ✅ Response body structure
- ✅ Error handling
- ✅ Data validation
- ✅ Search and filtering
- ✅ Pagination

### 2. Unit Tests (`tests/unit/`)
Tests for individual components and functions.

**Files:**
- `validation.test.js` - Input validation middleware
- `config.test.js` - Configuration system

**Coverage:**
- ✅ Function behavior
- ✅ Input validation
- ✅ Error conditions
- ✅ Edge cases
- ✅ Configuration loading

### 3. Integration Tests (`tests/integration/`)
Tests for component interactions and system behavior.

**Files:**
- `rateLimiter.test.js` - Rate limiting functionality

**Coverage:**
- ✅ Component interactions
- ✅ System behavior
- ✅ Performance testing
- ✅ Concurrent requests

### 4. Utility Tests (`tests/utils/`)
Tests for utility functions and helper modules.

**Files:**
- `logger.test.js` - Logging system

**Coverage:**
- ✅ Utility functions
- ✅ File operations
- ✅ Error handling
- ✅ Data formatting

## 📊 Test Coverage

### API Endpoints Tested
- `GET /api/health` - Health check
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get specific hotel
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get bookings

### Validation Rules Tested
- User registration validation
- Hotel data validation
- Booking validation
- Review validation
- Pagination validation

### System Components Tested
- Configuration management
- Logging system
- Rate limiting
- Error handling
- Database fallback

## 🛠️ Test Configuration

### Jest Configuration
Tests use Jest as the testing framework with the following configuration:

```javascript
// jest.config.js (auto-generated)
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
```

### Environment Setup
Tests run in a controlled environment with:
- Mock database connections
- Isolated test data
- Clean state between tests
- Proper cleanup

## 📝 Writing New Tests

### API Test Template
```javascript
const request = require('supertest');
const app = require('../../server');

describe('Endpoint Name', () => {
  test('should return expected response', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);

    expect(response.body).toHaveProperty('expectedField');
  });
});
```

### Unit Test Template
```javascript
const { functionToTest } = require('../../path/to/module');

describe('Function Name', () => {
  test('should handle valid input', () => {
    const result = functionToTest(validInput);
    expect(result).toBe(expectedOutput);
  });
});
```

## 🔧 Test Commands

### NPM Scripts
Add these to your `package.json`:

```json
{
  "scripts": {
    "test": "node tests/test-runner.js",
    "test:unit": "node tests/test-runner.js --unit",
    "test:api": "node tests/test-runner.js --api",
    "test:integration": "node tests/test-runner.js --integration",
    "test:utils": "node tests/test-runner.js --utils",
    "test:report": "node tests/test-runner.js --report"
  }
}
```

### Direct Jest Commands
```bash
# Run specific test file
npx jest tests/api/health.test.js

# Run with coverage
npx jest --coverage

# Run in watch mode
npx jest --watch

# Run with verbose output
npx jest --verbose
```

## 📈 Test Metrics

### Performance Benchmarks
- API response time: < 100ms
- Database queries: < 50ms
- File operations: < 10ms
- Memory usage: < 100MB

### Coverage Targets
- Line coverage: > 90%
- Function coverage: > 95%
- Branch coverage: > 85%

## 🐛 Debugging Tests

### Enable Debug Logging
```bash
DEBUG=* node tests/test-runner.js
```

### Run Single Test
```bash
npx jest tests/api/health.test.js --verbose
```

### Check Test Environment
```bash
node -e "console.log('Node version:', process.version)"
node -e "console.log('Jest available:', !!require.resolve('jest'))"
```

## 📋 Test Checklist

Before running tests, ensure:
- [ ] Server is not running on test port
- [ ] Database is configured (if needed)
- [ ] Environment variables are set
- [ ] Dependencies are installed
- [ ] Test data is prepared

## 🚨 Common Issues

### Port Already in Use
```bash
# Kill process using port 5001
lsof -ti:5001 | xargs kill -9
```

### Database Connection Issues
```bash
# Test database connection
node -e "require('./config').database"
```

### Missing Dependencies
```bash
# Install all dependencies
npm install
npm install --save-dev jest supertest
```

## 📞 Support

For test-related issues:
1. Check the test output for specific errors
2. Verify all dependencies are installed
3. Ensure the server is properly configured
4. Check environment variables
5. Review the test documentation

---

**Happy Testing! 🧪✨** 