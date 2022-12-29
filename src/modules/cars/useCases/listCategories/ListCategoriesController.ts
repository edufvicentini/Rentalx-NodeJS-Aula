import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const all = await listCategoriesUseCase.execute();

        return response.status(200).json(all);
    }
}

export { ListCategoriesController };
