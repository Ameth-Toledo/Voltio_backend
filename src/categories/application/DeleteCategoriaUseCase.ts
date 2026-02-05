import { ICategoriaRepository } from '../domain/ICategoriaRepository';

export class DeleteCategoriaUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.categoriaRepository.deleteCategoria(id);
  }
}
