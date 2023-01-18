import { Router, Request, Response } from 'express';
import * as controllers from '../../controllers/roles.controllers';
import authenticationMiddleware from '../../middleware/authentification.middleware';

const routes = Router();
// api/roles
routes.route('/all').get(controllers.all);
routes.route('/create').post(controllers.create);

routes
    .route('/:id')
        .get(controllers.findOne)
        .patch(controllers.updateOne)
        .delete(authenticationMiddleware, controllers.deleteOne);


export default routes;