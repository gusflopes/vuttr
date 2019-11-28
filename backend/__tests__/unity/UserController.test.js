import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // Email already exists on update
  it('should not allow to change email to an email already used', async () => {
    await factory.create('User', {
      email: 'email@email.com',
    });
    const user = await factory.create('User');

    const { email, password } = user;

    const authResponse = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = authResponse.body;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'email@email.com' });

    expect(response.status).toBe(400);
  });

  // Should be able to change email
  it('should allow to change email', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const authResponse = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = authResponse.body;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'new@email.com' });

    expect(response.status).toBe(200);
  });

  // Can't change password if oldPassword not provided
  it('should not allow to change password if oldPassword not provided', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const authResponse = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = authResponse.body;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'new123' });

    expect(response.status).toBe(400);
  });

  it('should not allow to change password if oldPassword doest not match', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const authResponse = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = authResponse.body;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ oldPassword: 'new123', password: 'new123' });

    expect(response.status).toBe(401);
  });
});
