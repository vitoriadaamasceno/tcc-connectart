const jwt = require("jsonwebtoken");
require("dotenv").config();

function userSignJwtAccessToken(
  payload,
  options = {
    expiresIn: "1h",
  }
) {
  const secret_key = process.env.SECRET_JWT;

  const token = jwt.sign(payload, secret_key, options);
  return token;
}

function userVerifyJwt(token) {
  try {
    const secret_key = process.env.SECRET_JWT;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
}

module.exports = {
  userSignJwtAccessToken,
  userVerifyJwt,
};
