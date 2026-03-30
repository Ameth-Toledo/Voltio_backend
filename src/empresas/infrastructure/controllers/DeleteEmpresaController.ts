import { Request, Response } from 'express';
import { DeleteEmpresaUseCase } from '../../application/DeleteEmpresaUseCase';

export class DeleteEmpresaController {
  constructor(private deleteEmpresaUseCase: DeleteEmpresaUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      await this.deleteEmpresaUseCase.execute(id);
      res.status(200).json({ message: 'Empresa eliminada exitosamente' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
