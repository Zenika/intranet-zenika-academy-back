module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      classMethods: {
        associate(models) {
          Users.hasOne(models.Promotions, { foreignKey: "promotionId" });
        }
      }
    }
  );

  return Users;
};
