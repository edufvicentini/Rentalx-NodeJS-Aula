import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationController } from '../modules/cars/useCases/listSpecification';

const specificationRouter = Router();

specificationRouter.post('/', (request, response) => {
    createSpecificationController.handle(request, response);
});

specificationRouter.get('/', (request, response) => {
    listSpecificationController.handle(request, response);
});
export { specificationRouter };
