import { IEmpresaRepository } from '../domain/IEmpresaRepository';
import { EmpresaUpdateRequest } from '../domain/dto/EmpresaRequest';
import { EmpresaResponse } from '../domain/dto/EmpresaResponse';

export class UpdateEmpresaUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(id: number, data: EmpresaUpdateRequest): Promise<EmpresaResponse> {
    if (!id || id <= 0) {
      throw new Error('ID de empresa inválido');
    }

    const empresa = await this.empresaRepository.updateEmpresa(id, data);
    if (!empresa) {
      throw new Error('Empresa no encontrada');
    }

    return new EmpresaResponse(empresa);
  }
}
