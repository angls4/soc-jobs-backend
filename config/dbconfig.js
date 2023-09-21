require('dotenv').config();
const {
  DB_USERNAME,
  DB_DATABASE,
  DB_PASSWORD = null,
  DB_HOST,
  DB_PORT,
  DB_DIALECT = 'mysql'
} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIALECT,
    "dialectOptions": {
      "connectTimeout": 60000 // Mengatur timeout koneksi menjadi 60 detik (opsional)
    }
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIALECT,
    "dialectOptions": {
      "connectTimeout": 60000 // Mengatur timeout koneksi menjadi 60 detik (opsional)
    }
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": DB_DIALECT,
    "dialectOptions": {
      "connectTimeout": 60000 // Mengatur timeout koneksi menjadi 60 detik (opsional)
    }
  }
};