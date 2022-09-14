require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_DEV_USER,
    password: process.env.MYSQL_DEV_ROOT,
    database: process.env.MYSQL_DEV_DB_NAME,
    host: process.env.MYSQL_DEV_HOST,
    "dialect": "mysql"
  },
  test: {
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DB_NAME,
    host: process.env.MYSQL_TEST_HOST,
    "dialect": "mysql"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql"
  },
  jwt: {
    options: {
      expiresIn: '24h',
      issuer: 'ksp.id'
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: false //for production set to true
    }
  }
};