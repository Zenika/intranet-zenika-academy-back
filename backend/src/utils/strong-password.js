const crypto = require('crypto');

const ensureStrongPasswords = (defaultPasswords) => {
  return Object.fromEntries(
    Object.entries(defaultPasswords).map(([role, defaultPassword]) => {
      if (process.env.NODE_ENV !== 'production') {
        return [role, defaultPassword || role || 'dev'];
      } else if (isStrongPassword(defaultPassword)) {
        return [role, defaultPassword];
      } else {
        return [role, randomStrongPassword()];
      }
    }),
  );
};

const isStrongPassword = (password) => {
  return password && password.length >= 12 && !password.match(/(.)\1{15}/);
};

const randomStrongPassword = () => {
  return crypto.randomBytes(16).toString('hex');
};

const defaultPasswords = ensureStrongPasswords({
  admin: process.env.ADMIN_DEFAULT_PASSWORD,
  teacher: process.env.TEACHER_DEFAULT_PASSWORD,
  student: process.env.STUDENT_DEFAULT_PASSWORD,
});

console.log('default passwords', JSON.stringify(defaultPasswords, null, 2));

module.exports = {
  defaultPasswords,
};
