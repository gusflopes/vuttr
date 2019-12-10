import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', { password: '123testing' });

    const { email, password } = user;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', { password: '123testing' });

    const { email } = user;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password: 'incorrect' });

    expect(response.status).toBe(401);
  });

  it('should not allow to login with incorrect email', async () => {
    const user = await factory.create('User', { email: 'correct@gmail.com' });

    const { password } = user;

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'incorrect@gmail.com', password });

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .put('/users')
      .send({ email: 'newemail@email.com' });

    expect(response.status).toBe(401);
  });

  it('should return a jwt token when authenticate', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private route with jwt token', async () => {
    const user = await factory.create('User');

    const { email, password } = user;

    const authResponse = await request(app)
      .post('/sessions')
      .send({ email, password });

    const { token } = authResponse.body;

    const response = await request(app)
      .put('/users/')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Name' });

    expect(response.status).toBe(200);
  });

  it('should not be able to access private route with invalid jwt token', async () => {
    const response = await request(app)
      .put('/users/')
      .set('Authorization', `Bearer Invalidtoken`)
      .send({ name: 'New Name' });

    expect(response.status).toBe(401);
  });
});
