import { Request, Response } from 'express';
import { GetOrdenesByEmpresaIdUseCase } from '../../application/GetOrdenesByEmpresaIdUseCase';

export class GetOrdenesByEmpresaIdController {
  constructor(private getOrdenesByEmpresaIdUseCase: GetOrdenesByEmpresaIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_empresa = parseInt(req.params.id_empresa as string, 10);
      if (isNaN(id_empresa)) {
        res.status(400).json({ error: 'ID de empresa inválido' });
        return;
      }

      const ordenes = await this.getOrdenesByEmpresaIdUseCase.execute(id_empresa);
      res.status(200).json(ordenes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
