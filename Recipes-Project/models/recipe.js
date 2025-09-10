// models/recipe.js
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
    }
  }, {
    timestamps: true
  });

  return Recipe;
};
