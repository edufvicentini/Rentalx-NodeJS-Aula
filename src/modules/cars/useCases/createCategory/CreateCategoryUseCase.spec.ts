import { AppError } from '../../../../errors/AppError';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;
describe('Create Category', () => {
    beforeEach(() => {
        inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase(
            inMemoryCategoriesRepository,
        );
    });
    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category Description Test',
        };
        await createCategoryUseCase.execute(category);

        const categoryCreated = await inMemoryCategoriesRepository.findByName(
            category.name,
        );

        expect(categoryCreated).toHaveProperty('id');
    });

    it('should not be able to create a new category with name exists', async () => {
        expect(async () => {
            const category = {
                name: 'Category Test',
                description: 'Category Description Test',
            };
            await createCategoryUseCase.execute(category);
            await createCategoryUseCase.execute(category);
        }).rejects.toBeInstanceOf(AppError);
    });
});
