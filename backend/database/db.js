const { Sequelize } = require("sequelize");
require('dotenv').config();

// Use environment variables for database configuration
const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres', 
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false,
    }
);

async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log('DB connection successful............................')
    }
    catch(error){
        console.error('Unable to connect to the database...............', error)

}    
}

// Only test connection if not in test environment
if (process.env.NODE_ENV !== 'test') {
    testConnection();
}

module.exports = sequelize;