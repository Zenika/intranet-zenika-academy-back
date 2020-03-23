'use strict';

const contraintName = 'users_email_unique_contrait';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: contraintName,
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeConstraint('Users', contraintName);
  },
};
