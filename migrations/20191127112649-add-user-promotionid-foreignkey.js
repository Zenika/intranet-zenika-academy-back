
module.exports = {
  up: (queryInterface) => queryInterface.addConstraint('Users', ['promotionId'], {
    type: 'FOREIGN KEY',
    name: 'FK_promotions_users', // useful if using queryInterface.removeConstraint
    references: {
      table: 'Promotions',
      field: 'id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  }),
  down: (queryInterface) => queryInterface.removeConstraint('Users', 'FK_promotions_users'),
};
