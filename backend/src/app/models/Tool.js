import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: { type: Sequelize.STRING, allowNull: false },
        link: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        tag: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: null },
      },
      {
        sequelize,
      }
    );
    // Hooks here

    return this;
  }

  // Methods here
}

export default Tool;
