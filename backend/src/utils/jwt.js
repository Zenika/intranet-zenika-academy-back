const jwt = require('jsonwebtoken');

const createJwt = (user, callback) => {
  jwt.sign(
    user,
    process.env.JWT_SECRET || "",
    {},
    callback
  );
};

const verifyJwt = (token, callback) => {
  jwt.verify(token, process.env.JWT_SECRET || "", {}, callback);
};

module.exports = {
    createJwt,
    verifyJwt
}