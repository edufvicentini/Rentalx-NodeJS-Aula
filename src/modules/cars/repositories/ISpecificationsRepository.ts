import { Specification } from '@modules/cars/entities/Specification';

interface ICreateSpecificationDTO {
    name: string;

    description: string;
}

interface ISpecificationsRepository {
    // lista os métodos

    create({ name, description }: ICreateSpecificationDTO): Promise<void>;

    list(): Promise<Specification[]>;

    findByName(name: string): Promise<Specification | undefined>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
