import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddleware from '../../middleware/authentification.middleware';

const routes = Router();
// api/users
routes.route('/all').get(controllers.all);
routes.route('/register').post(controllers.create);
routes
    .route('/:id')
        .get(authenticationMiddleware, controllers.findOne)
        .patch(authenticationMiddleware, controllers.updateOne)
        .delete(authenticationMiddleware, controllers.deleteOne);

// authentication
routes.route('/authenticate').post(controllers.authenticate);

export default routes;