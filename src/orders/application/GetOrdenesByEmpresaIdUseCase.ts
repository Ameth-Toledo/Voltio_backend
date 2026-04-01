import { IOrdenRepository } from '../domain/IOrdenRepository';
import { OrdenResponse } from '../domain/dto/OrdenResponse';

export class GetOrdenesByEmpresaIdUseCase {
  constructor(private ordenRepository: IOrdenRepository) {}

  async execute(id_empresa: number): Promise<OrdenResponse[]> {
    if (!id_empresa || id_empresa <= 0) {
      throw new Error('ID de empresa inválido');
    }

    const ordenes = await this.ordenRepository.getOrdenesByEmpresaId(id_empresa);
    return ordenes.map(orden => new OrdenResponse(orden));
  }
}
