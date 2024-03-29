import { CreateSpecificationUseCase } from '@modules/cars/useCases/createSpecification/CreateSpecificationUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase,
        );

        try {
            await createSpecificationUseCase.execute({ name, description });
        } catch (e) {
            return response.status(500).json({ message: (e as Error).message });
        }

        return response.status(201).send();
    }
}

export { CreateSpecificationController };
