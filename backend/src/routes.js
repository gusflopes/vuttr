import { Router } from 'express';

import ToolsController from './app/controllers/ToolsController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API running' }));

routes.post('/tools', ToolsController.store);
routes.get('/tools', ToolsController.index);
routes.get('/tools/:id', ToolsController.show);
routes.put('/tools/:id', ToolsController.update);
routes.delete('/tools/:id', ToolsController.delete);

export default routes;
