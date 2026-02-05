import { Request, Response } from 'express';
import { GetAllCategoriasUseCase } from '../../application/GetAllCategoriasUseCase';

export class GetAllCategoriasController {
  constructor(private getAllCategoriasUseCase: GetAllCategoriasUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await this.getAllCategoriasUseCase.execute();
      res.status(200).json(categorias);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
