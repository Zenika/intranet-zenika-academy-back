const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const createJwt = (user) => {
  return sign(user, process.env.JWT_SECRET || '', {});
};

const verifyJwt = (token) => {
  return verify(token, process.env.JWT_SECRET || '', {});
};

module.exports = {
  createJwt,
  verifyJwt,
};
