import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}
    async execute({
        name,
        email,
        driver_license,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('User already exists');
        }

        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash,
            avatar,
            id,
        });
    }
}
export { CreateUserUseCase };
