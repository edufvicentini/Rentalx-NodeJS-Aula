import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license, avatar } = request.body;
        const id = undefined;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
            driver_license,
            avatar,
            id,
        });

        return response.status(201).send();
    }
}

export { CreateUserController };
