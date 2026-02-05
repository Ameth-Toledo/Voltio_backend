import { Request, Response } from 'express';
import { GetEspecificacionByIdUseCase } from '../../application/GetEspecificacionByIdUseCase';

export class GetEspecificacionByIdController {
  constructor(private getEspecificacionByIdUseCase: GetEspecificacionByIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid especificacion ID' });
        return;
      }

      const especificacion = await this.getEspecificacionByIdUseCase.execute(id);
      if (!especificacion) {
        res.status(404).json({ error: 'Especificacion not found' });
        return;
      }

      res.status(200).json(especificacion);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
