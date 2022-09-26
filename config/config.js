require('dotenv').config();
const path = require('path');

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
      httpOnly: false, //set false cause to client side can get cookies
      sameSite: true,
      signed: true,
      secure: false //for production set to true
    }
  },
  storage : {
    destination: (req, file, cb) => {
      cb(null, 'src');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  },
  multer: {
    limits: {filesize: 2 * 1024 * 1024}, //that's mean allow only 2Mb file upload
    fileFilter: (req, file, cb) => {
        
        // console.log(file);
        var filetypes = /jpeg|jpg|png/;
        var mimestype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // check if file allow test and success
        if(mimestype && extname) return cb(null, true);

        return cb(new Error(`Error File Upload only supports the following file types - ${filetypes}`));
    }
  }
};