import { Request, Response } from 'express';
import { GetAllEspecificacionesUseCase } from '../../application/GetAllEspecificacionesUseCase';

export class GetAllEspecificacionesController {
  constructor(private getAllEspecificacionesUseCase: GetAllEspecificacionesUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const especificaciones = await this.getAllEspecificacionesUseCase.execute();
      res.status(200).json(especificaciones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
