const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Current log level (can be set via environment variable)
const currentLogLevel = process.env.LOG_LEVEL || 'INFO';

class Logger {
  constructor() {
    this.logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
  }

  // Write log to file
  writeLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    const logString = JSON.stringify(logEntry) + '\n';
    
    fs.appendFileSync(this.logFile, logString);
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      const consoleMessage = `[${timestamp}] ${level}: ${message}`;
      if (data) {
        console.log(consoleMessage, data);
      } else {
        console.log(consoleMessage);
      }
    }
  }

  // Check if log level should be displayed
  shouldLog(level) {
    return LOG_LEVELS[level] <= LOG_LEVELS[currentLogLevel];
  }

  error(message, data = null) {
    if (this.shouldLog('ERROR')) {
      this.writeLog('ERROR', message, data);
    }
  }

  warn(message, data = null) {
    if (this.shouldLog('WARN')) {
      this.writeLog('WARN', message, data);
    }
  }

  info(message, data = null) {
    if (this.shouldLog('INFO')) {
      this.writeLog('INFO', message, data);
    }
  }

  debug(message, data = null) {
    if (this.shouldLog('DEBUG')) {
      this.writeLog('DEBUG', message, data);
    }
  }

  // Log API requests
  logRequest(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress
      };

      if (res.statusCode >= 400) {
        this.error(`${req.method} ${req.url} - ${res.statusCode}`, logData);
      } else {
        this.info(`${req.method} ${req.url} - ${res.statusCode}`, logData);
      }
    });

    next();
  }

  // Log database operations
  logDatabase(operation, table, data = null) {
    this.debug(`Database ${operation} on ${table}`, data);
  }

  // Log authentication events
  logAuth(event, userId, success = true) {
    const logData = {
      event,
      userId,
      success,
      timestamp: new Date().toISOString()
    };

    if (success) {
      this.info(`Authentication: ${event}`, logData);
    } else {
      this.warn(`Authentication failed: ${event}`, logData);
    }
  }

  // Log booking events
  logBooking(event, bookingId, userId, data = null) {
    const logData = {
      event,
      bookingId,
      userId,
      ...data,
      timestamp: new Date().toISOString()
    };

    this.info(`Booking: ${event}`, logData);
  }

  // Log admin actions
  logAdmin(action, adminId, targetId = null, data = null) {
    const logData = {
      action,
      adminId,
      targetId,
      ...data,
      timestamp: new Date().toISOString()
    };

    this.info(`Admin action: ${action}`, logData);
  }

  // Get recent logs
  getRecentLogs(limit = 100) {
    try {
      const logContent = fs.readFileSync(this.logFile, 'utf8');
      const lines = logContent.trim().split('\n');
      const recentLines = lines.slice(-limit);
      
      return recentLines.map(line => {
        try {
          return JSON.parse(line);
        } catch (e) {
          return { message: line, error: 'Invalid JSON' };
        }
      });
    } catch (error) {
      return [];
    }
  }

  // Clear old log files (keep last 7 days)
  cleanupOldLogs() {
    try {
      const files = fs.readdirSync(logsDir);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      files.forEach(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < sevenDaysAgo) {
          fs.unlinkSync(filePath);
          this.info(`Deleted old log file: ${file}`);
        }
      });
    } catch (error) {
      this.error('Error cleaning up old logs', error);
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Clean up old logs on startup
logger.cleanupOldLogs();

module.exports = logger; 