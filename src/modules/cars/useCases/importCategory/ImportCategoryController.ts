import { ImportCategoryUseCase } from '@modules/cars/useCases/importCategory/ImportCategoryUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        const { file } = request;

        if (!file) {
            return response.status(400).send('File not Sent!');
        }

        await importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController };
