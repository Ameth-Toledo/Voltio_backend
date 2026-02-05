import { Request, Response } from 'express';
import { GetProductsByCategoryUseCase } from '../../application/GetProductsByCategoryUseCase';

export class GetProductsByCategoryController {
  constructor(private getProductsByCategoryUseCase: GetProductsByCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id_categoria = parseInt(req.params.id_categoria as string, 10);
      if (isNaN(id_categoria)) {
        res.status(400).json({ error: 'Invalid category ID' });
        return;
      }

      const products = await this.getProductsByCategoryUseCase.execute(id_categoria);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
