
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    timestamps: true
  });

  User.associate = models => {
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
    User.belongsToMany(models.Recipe, {
      through: models.UserFavorites,
      foreignKey: 'userId',
      as: 'favorites'
    });
  };

  return User;
};
