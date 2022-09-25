const multer = require('multer');
const config = require('../config/config');

const storage = multer.diskStorage(config.storage)

exports.upload = multer({storage, ...config.multer});
