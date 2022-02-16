import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

/**
 * [x] Definir o tipo de retorno
 * [X] Alterar retorno de erro
 * [x] Acessar o repositório
 * [x] Retornar algo
 */

class CreateCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category already exists!');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
