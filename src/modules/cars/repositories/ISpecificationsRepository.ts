import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    // lista os métodos
    create({ name, description }: ICreateSpecificationDTO): void;
    list(): Specification[];
    findByName(name: string): Specification | undefined;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
