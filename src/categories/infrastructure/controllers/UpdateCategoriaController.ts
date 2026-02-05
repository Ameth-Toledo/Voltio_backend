import { Request, Response } from 'express';
import { UpdateCategoriaUseCase } from '../../application/UpdateCategoriaUseCase';
import { CategoriaUpdateRequest } from '../../domain/dto/CategoriaRequest';

export class UpdateCategoriaController {
  constructor(private updateCategoriaUseCase: UpdateCategoriaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid categoria ID' });
        return;
      }

      const data: CategoriaUpdateRequest = req.body;
      const categoria = await this.updateCategoriaUseCase.execute(id, data);

      if (!categoria) {
        res.status(404).json({ error: 'Categoria not found' });
        return;
      }

      res.status(200).json(categoria);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
