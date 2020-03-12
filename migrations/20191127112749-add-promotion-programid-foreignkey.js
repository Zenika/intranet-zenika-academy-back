
module.exports = {
  up: (queryInterface) => queryInterface.addConstraint('Promotions', ['programId'], {
    type: 'FOREIGN KEY',
    name: 'FK_promotions_programs', // useful if using queryInterface.removeConstraint
    references: {
      table: 'Programs',
      field: 'id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  }),
  down: (queryInterface) => queryInterface.removeConstraint('Promotions', 'FK_promotions_programs'),
};
