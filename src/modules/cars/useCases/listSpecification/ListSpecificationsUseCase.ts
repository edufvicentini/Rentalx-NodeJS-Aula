import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

class ListSpecificationsUseCase {
    constructor(private specificationsRepository: SpecificationsRepository) {}

    execute() {
        return this.specificationsRepository.list();
    }
}

export { ListSpecificationsUseCase };
