const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET_JWT;

module.exports = secret;
