import { Request, Response } from 'express';
import { GetAllProductsUseCase } from '../../application/GetAllProductsUseCase';

export class GetAllProductsController {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.getAllProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
