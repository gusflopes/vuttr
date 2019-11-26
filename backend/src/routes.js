import { Router } from 'express';

import ToolsController from './app/controllers/ToolsController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API running' }));

routes.get('/tools', ToolsController.index);
routes.post('/tools', ToolsController.store);
routes.delete('/tools/:id', ToolsController.delete);

export default routes;
