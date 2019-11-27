import request from 'supertest';

import faker from 'faker';
import app from '../../src/app';
import factory from '../factories';
import authenticate from '../util/authenticate';
import truncate from '../util/truncate';

describe('ToolController', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Email already exists on update
  it('should be able to list all registers', async () => {
    const token = await authenticate();

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should be able to list all registers with the provided tag', async () => {
    const token = await authenticate();

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`)
      .query({ tag: 'Node.js' })
      .send();

    expect(response.status).toBe(200);
  });

  it('should be able to create a new register', async () => {
    const token = await authenticate();

    const tool = {
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.random.words(),
      tags: [faker.random.arrayElement(), faker.random.arrayElement()],
    };

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to delete a register', async () => {
    const token = await authenticate();
    const tool = await factory.create('Tool');

    const { id } = tool;
    const response = await request(app)
      .delete(`/tools/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(204);
  });
  it('should respond fail when deleting an inexisting tool', async () => {
    const token = await authenticate();

    const response = await request(app)
      .delete(`/tools/67`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });
});
