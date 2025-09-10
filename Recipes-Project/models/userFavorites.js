module.exports = (sequelize, DataTypes) => {
  const UserFavorites = sequelize.define('UserFavorites', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    timestamps: true
  });

  return UserFavorites;
};
