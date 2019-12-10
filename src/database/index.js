import Sequelize from 'sequelize';
// import mongoose from 'mongoose';

// Import Models Here
import User from '../app/models/User';
import Tool from '../app/models/Tool';
// Database Configuration
import databaseConfig from '../config/database';

// Models list
const models = [User, Tool];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  /*
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
  */
}

export default new Database();
