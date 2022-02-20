import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationsController } from './ListSpecificationController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationsUseCase(
    specificationsRepository,
);
const listSpecificationController = new ListSpecificationsController(
    listSpecificationUseCase,
);

export { listSpecificationController };
