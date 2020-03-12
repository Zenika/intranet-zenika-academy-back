module.exports = (sequelize, DataTypes) => {
  const Programs = sequelize.define('Programs', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      get() {
        if (!this.getDataValue('content')) return [];
        const array = this.getDataValue('content').split(';');
        return array.map((id) => parseInt(id, 10));
      },
      set(val) {
        this.setDataValue('content', val.join(';'));
      },
    },
  },
  {
    classMethods: {
      associate(models) {
        Programs.belongsToMany(models.Promotions, { foreignKey: 'programId' });
      },
    },
  });

  return Programs;
};
