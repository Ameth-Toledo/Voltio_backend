import { Request, Response } from 'express';
import { GetProductsByEmpresaUseCase } from '../../application/GetProductsByEmpresaUseCase';

export class GetProductsByEmpresaController {
  constructor(private getProductsByEmpresaUseCase: GetProductsByEmpresaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_empresa = parseInt(req.params.id_empresa as string, 10);
      if (isNaN(id_empresa)) {
        res.status(400).json({ error: 'Invalid empresa ID' });
        return;
      }

      const products = await this.getProductsByEmpresaUseCase.execute(id_empresa);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
