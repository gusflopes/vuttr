import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

export default async function authenticate() {
  const user = await factory.create('User');
  const { email, password } = user;

  const authResponse = await request(app)
    .post('/sessions')
    .send({ email, password });
  const { token } = authResponse.body;

  return token;
}
