import { Request, Response } from 'express';
import { GetEmpresaByUsuarioIdUseCase } from '../../application/GetEmpresaByUsuarioIdUseCase';

export class GetEmpresaByUsuarioIdController {
  constructor(private getEmpresaByUsuarioIdUseCase: GetEmpresaByUsuarioIdUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario as string, 10);
      const empresa = await this.getEmpresaByUsuarioIdUseCase.execute(id_usuario);
      res.status(200).json(empresa);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
