module.exports = (sequelize, DataTypes) => {
  const Promotions = sequelize.define('Promotions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,

    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    classMethods: {
      associate(models) {
        Promotions.belongsToMany(models.Users, { foreignKey: 'promotionId' });
        Promotions.hasOne(models.Programs, { foreignKey: 'programId' });
      },
    },
  });

  return Promotions;
};
