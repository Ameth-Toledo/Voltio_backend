import { ICategoriaRepository } from '../domain/ICategoriaRepository';
import { CategoriaResponse } from '../domain/dto/CategoriaResponse';

export class GetAllCategoriasUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(): Promise<CategoriaResponse[]> {
    const categorias = await this.categoriaRepository.getAllCategorias();
    return categorias.map(categoria => new CategoriaResponse(categoria));
  }
}
