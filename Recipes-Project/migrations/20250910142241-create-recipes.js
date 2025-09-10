'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      ingredients: Sequelize.TEXT,
      instructions: Sequelize.TEXT,
      cookingTime: Sequelize.INTEGER,
      servings: Sequelize.INTEGER,
      difficulty: Sequelize.ENUM('easy','medium','hard'),
      imageUrl: Sequelize.STRING,
      isPublic: { type: Sequelize.BOOLEAN, defaultValue: true },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};
