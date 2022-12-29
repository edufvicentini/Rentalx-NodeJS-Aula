import { UpdateUserAvatarUseCase } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateUserAvatarController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const avatar_file = request.file?.filename as string;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase,
        );

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
