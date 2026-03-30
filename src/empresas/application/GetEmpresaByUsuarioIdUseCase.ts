import { IEmpresaRepository } from '../domain/IEmpresaRepository';
import { EmpresaResponse } from '../domain/dto/EmpresaResponse';

export class GetEmpresaByUsuarioIdUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(id_usuario: number): Promise<EmpresaResponse> {
    if (!id_usuario || id_usuario <= 0) {
      throw new Error('ID de usuario inválido');
    }

    const empresa = await this.empresaRepository.getEmpresaByUsuarioId(id_usuario);
    if (!empresa) {
      throw new Error('Empresa no encontrada para este usuario');
    }

    return new EmpresaResponse(empresa);
  }
}
