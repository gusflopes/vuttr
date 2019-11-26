import { Router } from 'express';

// Import Controllers

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionContoller';
import ToolController from './app/controllers/ToolController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Public Routes
routes.get('/', (req, res) => res.json({ message: 'API running' }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware
routes.use(authMiddleware);

// Private API Routes
routes.put('/users', UserController.update);

// Tools Block
routes.post('/tools', ToolController.store);
routes.get('/tools', ToolController.index);
routes.get('/tools/:id', ToolController.show);
routes.put('/tools', ToolController.update);
routes.delete('/tools', ToolController.delete);

export default routes;
