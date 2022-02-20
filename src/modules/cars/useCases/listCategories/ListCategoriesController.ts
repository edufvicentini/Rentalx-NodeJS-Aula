import { Response, Request } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    handle(request: Request, response: Response) {
        const all = this.listCategoriesUseCase.execute();

        return response.status(200).json(all);
    }
}

export { ListCategoriesController };
