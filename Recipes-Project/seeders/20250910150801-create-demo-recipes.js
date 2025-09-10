'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', [
      {
        id: '1',
        title: 'Pasta Bolognese',
        description: 'Classic pasta with meat sauce',
        ingredients: JSON.stringify(['pasta', 'tomato', 'meat']),
        instructions: JSON.stringify(['Boil pasta', 'Cook sauce', 'Mix together']),
        cookingTime: 30,
        servings: 2,
        difficulty: 'Easy',
        imageUrl: 'https://example.com/pasta.jpg',
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake',
        ingredients: JSON.stringify(['flour', 'cocoa powder', 'sugar', 'eggs']),
        instructions: JSON.stringify(['Mix ingredients', 'Bake at 180C for 40 mins']),
        cookingTime: 60,
        servings: 8,
        difficulty: 'Medium',
        imageUrl: 'https://example.com/cake.jpg',
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
