import { IEmpresaRepository } from '../domain/IEmpresaRepository';

export class DeleteEmpresaUseCase {
  constructor(private empresaRepository: IEmpresaRepository) {}

  async execute(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('ID de empresa inválido');
    }

    const deleted = await this.empresaRepository.deleteEmpresa(id);
    if (!deleted) {
      throw new Error('Empresa no encontrada');
    }
  }
}
