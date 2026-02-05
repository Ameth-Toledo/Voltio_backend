import { ICategoriaRepository } from '../domain/ICategoriaRepository';
import { CategoriaUpdateRequest } from '../domain/dto/CategoriaRequest';
import { CategoriaResponse } from '../domain/dto/CategoriaResponse';

export class UpdateCategoriaUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(id: number, data: CategoriaUpdateRequest): Promise<CategoriaResponse | null> {
    if (data.nombre_categoria && data.nombre_categoria.trim() === '') {
      throw new Error('El nombre de la categoría no puede estar vacío');
    }

    const categoria = await this.categoriaRepository.updateCategoria(id, {
      nombre_categoria: data.nombre_categoria?.trim(),
    });

    return categoria ? new CategoriaResponse(categoria) : null;
  }
}
