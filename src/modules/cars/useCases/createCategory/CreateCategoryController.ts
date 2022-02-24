import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        try {
            await this.createCategoryUseCase.execute({ name, description });
        } catch (e) {
            return response.status(400).json({ message: (e as Error).message });
        }
        return response.status(201).send();
    }
}

export { CreateCategoryController };
