import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Tool from '../src/app/models/Tool';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Tool', Tool, {
  title: faker.name.title(),
  link: faker.internet.url(),
  description: faker.random.words(),
  tags: [faker.random.arrayElement(), faker.random.arrayElement()],
});

export default factory;
