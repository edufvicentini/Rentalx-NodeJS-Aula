import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';
import { Router } from 'express';

import { ensureAutenticated } from '../middleware/ensureAuthenticated';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

specificationRouter.use(ensureAutenticated);
specificationRouter.post('/', createSpecificationController.handle);

specificationRouter.get('/', listSpecificationsController.handle);

export { specificationRouter };
