import { Request, Response } from 'express';
import { CreateOrdenUseCase } from '../../application/CreateOrdenUseCase';
import { OrdenRequest } from '../../domain/dto/OrdenRequest';

export class CreateOrdenController {
  constructor(private createOrdenUseCase: CreateOrdenUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: OrdenRequest = req.body;
      console.log('📨 Datos de orden recibidos:', JSON.stringify(data, null, 2));
      const orden = await this.createOrdenUseCase.execute(data);
      res.status(201).json(orden);
    } catch (error: any) {
      console.error('❌ Error al crear orden:', error);
      res.status(400).json({ error: error.message });
    }
  }
}
