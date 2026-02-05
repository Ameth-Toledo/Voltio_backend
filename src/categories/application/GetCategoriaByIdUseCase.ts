import { ICategoriaRepository } from '../domain/ICategoriaRepository';
import { CategoriaResponse } from '../domain/dto/CategoriaResponse';

export class GetCategoriaByIdUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(id: number): Promise<CategoriaResponse | null> {
    const categoria = await this.categoriaRepository.getCategoriaById(id);
    return categoria ? new CategoriaResponse(categoria) : null;
  }
}
