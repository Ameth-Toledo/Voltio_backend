import { Request, Response } from 'express';
import { CreateCategoriaUseCase } from '../../application/CreateCategoriaUseCase';
import { CategoriaRequest } from '../../domain/dto/CategoriaRequest';

export class CreateCategoriaController {
  constructor(private createCategoriaUseCase: CreateCategoriaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: CategoriaRequest = req.body;
      const categoria = await this.createCategoriaUseCase.execute(data);
      res.status(201).json(categoria);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
