import { Request, Response } from 'express';
import { CreateEspecificacionUseCase } from '../../application/CreateEspecificacionUseCase';
import { EspecificacionRequest } from '../../domain/dto/EspecificacionRequest';

export class CreateEspecificacionController {
  constructor(private createEspecificacionUseCase: CreateEspecificacionUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: EspecificacionRequest = req.body;
      const especificacion = await this.createEspecificacionUseCase.execute(data);
      res.status(201).json(especificacion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
