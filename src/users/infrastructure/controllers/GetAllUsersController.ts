import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../application/GetAllUsersUseCase';
import { UserResponse } from '../../domain/dto/UserResponse';

export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();

      const userResponses: UserResponse[] = users.map(user => ({
        id: user.id,
        name: user.name,
        secondname: user.secondname,
        lastname: user.lastname,
        secondlastname: user.secondlastname,
        email: user.email,        phone: user.phone,
        image_profile: user.image_profile,
        role: user.role,
        created_at: user.created_at.toISOString(),
      }));

      res.status(200).json({ users: userResponses });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}