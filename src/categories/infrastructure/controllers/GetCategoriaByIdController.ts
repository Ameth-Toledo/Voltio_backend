import { Request, Response } from 'express';
import { GetCategoriaByIdUseCase } from '../../application/GetCategoriaByIdUseCase';

export class GetCategoriaByIdController {
  constructor(private getCategoriaByIdUseCase: GetCategoriaByIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid categoria ID' });
        return;
      }

      const categoria = await this.getCategoriaByIdUseCase.execute(id);
      if (!categoria) {
        res.status(404).json({ error: 'Categoria not found' });
        return;
      }

      res.status(200).json(categoria);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
