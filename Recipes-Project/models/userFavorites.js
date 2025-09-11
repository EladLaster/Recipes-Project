module.exports = (sequelize, DataTypes) => {
  const UserFavorites = sequelize.define('UserFavorites', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Recipes', key: 'id' }
    }
  }, {
    timestamps: true,
    updatedAt: false
  });

  UserFavorites.associate = models => {
    UserFavorites.belongsTo(models.User, { foreignKey: 'userId' });
    UserFavorites.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  };

  return UserFavorites;
};
