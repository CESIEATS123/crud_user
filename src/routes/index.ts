import { Router } from 'express';
import usersRoutes from './api/users.routes'
import rolesRoutes from './api/roles.routes'
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/roles', rolesRoutes);

export default routes;