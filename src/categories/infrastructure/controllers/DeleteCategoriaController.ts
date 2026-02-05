import { Request, Response } from 'express';
import { DeleteCategoriaUseCase } from '../../application/DeleteCategoriaUseCase';

export class DeleteCategoriaController {
  constructor(private deleteCategoriaUseCase: DeleteCategoriaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid categoria ID' });
        return;
      }

      const success = await this.deleteCategoriaUseCase.execute(id);
      if (!success) {
        res.status(404).json({ error: 'Categoria not found' });
        return;
      }

      res.status(200).json({ message: 'Categoria deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
