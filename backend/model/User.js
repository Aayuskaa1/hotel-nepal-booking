const {Sequelize, DataTypes} = require('sequelize');

// Use test database if in test environment
const sequelize = process.env.NODE_ENV === 'test' 
    ? require('../database/testDb')
    : require('../database/db');

const User = sequelize.define('Users',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    username: {
        type:DataTypes.STRING,
     },
    password: {
        type:DataTypes.STRING,

    }
})

module.exports = User;