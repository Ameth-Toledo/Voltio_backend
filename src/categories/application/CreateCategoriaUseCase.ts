import { ICategoriaRepository } from '../domain/ICategoriaRepository';
import { CategoriaRequest } from '../domain/dto/CategoriaRequest';
import { CategoriaResponse } from '../domain/dto/CategoriaResponse';

export class CreateCategoriaUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(data: CategoriaRequest): Promise<CategoriaResponse> {
    if (!data.nombre_categoria || data.nombre_categoria.trim() === '') {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    const existingCategoria = await this.categoriaRepository.getCategoriaByName(data.nombre_categoria.trim());
    if (existingCategoria) {
      throw new Error('La categoría ya existe');
    }

    const categoria = await this.categoriaRepository.createCategoria({
      nombre_categoria: data.nombre_categoria.trim(),
    });

    return new CategoriaResponse(categoria);
  }
}
