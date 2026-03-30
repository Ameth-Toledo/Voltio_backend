import { Request, Response } from 'express';
import { CreateEmpresaUseCase } from '../../application/CreateEmpresaUseCase';

export class CreateEmpresaController {
  constructor(private createEmpresaUseCase: CreateEmpresaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const empresa = await this.createEmpresaUseCase.execute(req.body);
      res.status(201).json(empresa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
