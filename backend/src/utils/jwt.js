const jwt = require('jsonwebtoken');

const createJwt = async user => {
  return jwt.sign(
    user,
    process.env.JWT_SECURITY_KEY || ""
  );
};

const verifyJwt = async token => {
  return jwt.verify(token, process.env.JWT_SECURITY_KEY || "");
};

module.exports = {
    createJwt,
    verifyJwt
}