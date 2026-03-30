import { IEmpresaRepository } from '../domain/IEmpresaRepository';
import { EmpresaResponse } from '../domain/dto/EmpresaResponse';

export class GetAllEmpresasUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(): Promise<EmpresaResponse[]> {
    const empresas = await this.empresaRepository.getAllEmpresas();
    return empresas.map(e => new EmpresaResponse(e));
  }
}
