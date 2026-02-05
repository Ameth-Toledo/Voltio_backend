import { Request, Response } from 'express';
import { DeleteProductUseCase } from '../../application/DeleteProductUseCase';

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }

      const success = await this.deleteProductUseCase.execute(id);
      if (!success) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
