require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'mysql'
  },
  production: {
    url: process.env.DB_URL, 
    dialect: 'mysql'
  }
};
