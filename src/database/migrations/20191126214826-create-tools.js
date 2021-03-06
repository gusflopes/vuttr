module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tools', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING, allowNull: false },
      tags: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: null },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tools');
  },
};
