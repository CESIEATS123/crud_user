import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/roles.controllers';
import authenticationMiddleware from '../../middleware/authentification.middleware';

const routes = Router();
// api/roles
routes.route('/').get(authenticationMiddleware, controllers.getMany).post(controllers.create);

routes
    .route('/:id')
        .get(authenticationMiddleware, controllers.getOne)
        .patch(authenticationMiddleware, controllers.updateOne)
        .delete(authenticationMiddleware, controllers.deleteOne);


export default routes;