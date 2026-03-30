import { Request, Response } from 'express';
import { GetEmpresaByIdUseCase } from '../../application/GetEmpresaByIdUseCase';

export class GetEmpresaByIdController {
  constructor(private getEmpresaByIdUseCase: GetEmpresaByIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const empresa = await this.getEmpresaByIdUseCase.execute(id);
      res.status(200).json(empresa);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
