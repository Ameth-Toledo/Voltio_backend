import { IEmpresaRepository } from '../domain/IEmpresaRepository';
import { EmpresaResponse } from '../domain/dto/EmpresaResponse';

export class GetEmpresaByIdUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(id: number): Promise<EmpresaResponse> {
    if (!id || id <= 0) {
      throw new Error('ID de empresa inválido');
    }

    const empresa = await this.empresaRepository.getEmpresaById(id);
    if (!empresa) {
      throw new Error('Empresa no encontrada');
    }

    return new EmpresaResponse(empresa);
  }
}
