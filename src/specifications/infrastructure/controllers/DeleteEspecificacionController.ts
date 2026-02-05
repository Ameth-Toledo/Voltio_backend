import { Request, Response } from 'express';
import { DeleteEspecificacionUseCase } from '../../application/DeleteEspecificacionUseCase';

export class DeleteEspecificacionController {
  constructor(private deleteEspecificacionUseCase: DeleteEspecificacionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid especificacion ID' });
        return;
      }

      const success = await this.deleteEspecificacionUseCase.execute(id);
      if (!success) {
        res.status(404).json({ error: 'Especificacion not found' });
        return;
      }

      res.status(200).json({ message: 'Especificacion deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
