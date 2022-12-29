import { Category } from '@modules/cars/entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';

// Singleton

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }

    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();

        return categories;
    }

    async findByName(name: string): Promise<Category | undefined> {
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
