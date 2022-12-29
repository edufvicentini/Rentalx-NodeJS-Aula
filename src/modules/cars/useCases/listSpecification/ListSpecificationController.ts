import { ListSpecificationsUseCase } from '@modules/cars/useCases/listSpecification/ListSpecificationsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecificationUseCase = container.resolve(
            ListSpecificationsUseCase,
        );

        const all = await listSpecificationUseCase.execute();

        return response.status(200).json(all);
    }
}

export { ListSpecificationsController };
