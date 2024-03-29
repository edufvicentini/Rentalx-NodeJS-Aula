import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: SpecificationsRepository,
    ) {}

    async execute() {
        const all = await this.specificationsRepository.list();

        return all;
    }
}

export { ListSpecificationsUseCase };
