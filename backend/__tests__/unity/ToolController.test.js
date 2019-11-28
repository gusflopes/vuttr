import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import authenticate from '../util/authenticate';
import truncate from '../util/truncate';

describe('ToolController', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Index Method
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
    const tool = await factory.create('Tool', { tags: ['Node.js'] });

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`)
      .query({ tags: 'Node.js' })
      .send();

    expect(response.body[0].id === tool.id).toBeTruthy();
    expect(response.status).toBe(200);
  });

  // Show Method
  it('should be able to show the register', async () => {
    const token = await authenticate();
    const tool = await factory.create('Tool');

    const { id } = tool;

    const response = await request(app)
      .get(`/tools/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id === tool.id).toBeTruthy();
  });

  // Store Method
  it('should be able to create a new register', async () => {
    const token = await authenticate();
    const tool = await factory.attrs('Tool');

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  // Update Method
  it('should be able to update a register', async () => {
    const token = await authenticate();
    const tool = await factory.create('Tool');

    const { id } = tool;

    const response = await request(app)
      .put(`/tools/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Title' });

    expect(response.body.title).toBe('New Title');
    expect(response.status).toBe(200);
  });

  // Delete Method
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
