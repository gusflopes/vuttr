import { Router } from 'express';

// Import Controllers

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionContoller';
import ToolController from './app/controllers/ToolController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Public Routes
routes.get('/v1/', (req, res) => res.json({ message: 'API running' }));
routes.post('/v1/users', UserController.store);
routes.post('/v1/sessions', SessionController.store);

// Middleware
routes.use(authMiddleware);

// Private API Routes
routes.put('/v1/users', UserController.update);

// Tools Block
routes.post('/v1/tools', ToolController.store);
routes.get('/v1/tools', ToolController.index);
routes.get('/v1/tools/:id', ToolController.show);
routes.put('/v1/tools/:id', ToolController.update);
routes.delete('/v1/tools/:id', ToolController.delete);

export default routes;
