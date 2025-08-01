const { Sequelize } = require('sequelize');

// Create in-memory SQLite database for testing
const testSequelize = new Sequelize('sqlite::memory:', {
    logging: false,
    dialect: 'sqlite'
});

module.exports = testSequelize;
