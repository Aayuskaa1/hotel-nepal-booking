const fs = require('fs');
const path = require('path');
const logger = require('../../utils/logger');

describe('Logger System', () => {
  const logsDir = path.join(__dirname, '../../logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logsDir, `${today}.log`);

  beforeEach(() => {
    // Clean up any existing log files for testing
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
  });

  test('should create logs directory if it does not exist', () => {
    expect(fs.existsSync(logsDir)).toBe(true);
  });

  test('should write info log message', () => {
    const testMessage = 'Test info message';
    logger.info(testMessage);

    expect(fs.existsSync(logFile)).toBe(true);
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain(testMessage);
    expect(logContent).toContain('INFO');
  });

  test('should write error log message', () => {
    const testMessage = 'Test error message';
    logger.error(testMessage);

    expect(fs.existsSync(logFile)).toBe(true);
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain(testMessage);
    expect(logContent).toContain('ERROR');
  });

  test('should write warn log message', () => {
    const testMessage = 'Test warning message';
    logger.warn(testMessage);

    expect(fs.existsSync(logFile)).toBe(true);
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain(testMessage);
    expect(logContent).toContain('WARN');
  });

  test('should write debug log message', () => {
    const testMessage = 'Test debug message';
    logger.debug(testMessage);

    expect(fs.existsSync(logFile)).toBe(true);
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain(testMessage);
    expect(logContent).toContain('DEBUG');
  });

  test('should write log with data', () => {
    const testMessage = 'Test message with data';
    const testData = { userId: 123, action: 'login' };
    
    logger.info(testMessage, testData);

    expect(fs.existsSync(logFile)).toBe(true);
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain(testMessage);
    expect(logContent).toContain('123');
    expect(logContent).toContain('login');
  });

  test('should create JSON formatted log entries', () => {
    const testMessage = 'Test JSON log';
    logger.info(testMessage);

    const logContent = fs.readFileSync(logFile, 'utf8');
    const logEntry = JSON.parse(logContent.trim());

    expect(logEntry).toHaveProperty('timestamp');
    expect(logEntry).toHaveProperty('level');
    expect(logEntry).toHaveProperty('message');
    expect(logEntry).toHaveProperty('data');
    expect(logEntry.message).toBe(testMessage);
    expect(logEntry.level).toBe('INFO');
  });

  test('should log authentication events', () => {
    const event = 'user_login';
    const userId = 123;
    const success = true;

    logger.logAuth(event, userId, success);

    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain('Authentication: user_login');
    expect(logContent).toContain('123');
    expect(logContent).toContain('true');
  });

  test('should log booking events', () => {
    const event = 'booking_created';
    const bookingId = 456;
    const userId = 123;
    const data = { hotelId: 1, totalPrice: 20000 };

    logger.logBooking(event, bookingId, userId, data);

    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain('Booking: booking_created');
    expect(logContent).toContain('456');
    expect(logContent).toContain('123');
    expect(logContent).toContain('1');
    expect(logContent).toContain('20000');
  });

  test('should log admin actions', () => {
    const action = 'user_deleted';
    const adminId = 789;
    const targetId = 123;
    const data = { reason: 'violation' };

    logger.logAdmin(action, adminId, targetId, data);

    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).toContain('Admin action: user_deleted');
    expect(logContent).toContain('789');
    expect(logContent).toContain('123');
    expect(logContent).toContain('violation');
  });

  test('should get recent logs', () => {
    logger.info('Test message 1');
    logger.info('Test message 2');
    logger.info('Test message 3');

    const recentLogs = logger.getRecentLogs(2);
    expect(recentLogs).toHaveLength(2);
    expect(recentLogs[recentLogs.length - 1].message).toBe('Test message 3');
  });

  test('should handle log file not existing gracefully', () => {
    // Remove log file to test graceful handling
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }

    const recentLogs = logger.getRecentLogs();
    expect(recentLogs).toEqual([]);
  });

  test('should respect log levels', () => {
    const originalLogLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'ERROR';
    
    // Reload logger to test log level
    delete require.cache[require.resolve('../../utils/logger')];
    const testLogger = require('../../utils/logger');
    
    testLogger.debug('This should not be logged');
    testLogger.info('This should not be logged');
    testLogger.error('This should be logged');
    
    const logContent = fs.readFileSync(logFile, 'utf8');
    expect(logContent).not.toContain('This should not be logged');
    expect(logContent).toContain('This should be logged');
    
    // Restore original log level
    process.env.LOG_LEVEL = originalLogLevel;
  });
}); 