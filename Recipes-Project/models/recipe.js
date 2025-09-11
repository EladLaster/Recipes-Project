
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    cookingTime: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    difficulty: DataTypes.ENUM('easy', 'medium', 'hard'),
    imageUrl: DataTypes.STRING,
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
      userId: {              
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    timestamps: true
  });

  Recipe.associate = models => {
    Recipe.belongsTo(models.User, { foreignKey: 'userId' });
    Recipe.belongsToMany(models.User, {
      through: models.UserFavorites,
      foreignKey: 'recipeId',
      as: 'favoritedBy'
    });
  };

  return Recipe;
};
