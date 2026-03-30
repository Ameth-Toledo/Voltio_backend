import { Request, Response } from 'express';
import { GetAllEmpresasUseCase } from '../../application/GetAllEmpresasUseCase';

export class GetAllEmpresasController {
  constructor(private getAllEmpresasUseCase: GetAllEmpresasUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const empresas = await this.getAllEmpresasUseCase.execute();
      res.status(200).json(empresas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
