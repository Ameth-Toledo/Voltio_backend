import { Request, Response } from 'express';
import { GetEspecificacionesByProductIdUseCase } from '../../application/GetEspecificacionesByProductIdUseCase';

export class GetEspecificacionesByProductIdController {
  constructor(private getEspecificacionesByProductIdUseCase: GetEspecificacionesByProductIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_producto = parseInt(req.params.id_producto as string, 10);
      if (isNaN(id_producto)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }

      const especificaciones = await this.getEspecificacionesByProductIdUseCase.execute(id_producto);
      res.status(200).json(especificaciones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
