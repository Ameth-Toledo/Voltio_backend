import { Request, Response } from 'express';
import { UpdateEspecificacionUseCase } from '../../application/UpdateEspecificacionUseCase';
import { EspecificacionUpdateRequest } from '../../domain/dto/EspecificacionRequest';

export class UpdateEspecificacionController {
  constructor(private updateEspecificacionUseCase: UpdateEspecificacionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid especificacion ID' });
        return;
      }

      const data: EspecificacionUpdateRequest = req.body;
      const especificacion = await this.updateEspecificacionUseCase.execute(id, data);

      if (!especificacion) {
        res.status(404).json({ error: 'Especificacion not found' });
        return;
      }

      res.status(200).json(especificacion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
