import { Request, Response } from 'express';
import { UpdateEmpresaUseCase } from '../../application/UpdateEmpresaUseCase';

export class UpdateEmpresaController {
  constructor(private updateEmpresaUseCase: UpdateEmpresaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const empresa = await this.updateEmpresaUseCase.execute(id, req.body);
      res.status(200).json(empresa);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
