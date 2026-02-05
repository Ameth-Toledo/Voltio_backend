import { Router, Request, Response } from 'express';
import { CreateProductUseCase } from '../../application/CreateProductUseCase';
import { ProductRequest } from '../../domain/dto/ProductRequest';
import { uploadImageToCloudinary } from '../../../core/config/cloudinary_service';

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: ProductRequest = req.body;

      if (req.file) {
        const imageUrl = await uploadImageToCloudinary(req.file.buffer, 'products');
        data.imagen_url = imageUrl;
      }

      const product = await this.createProductUseCase.execute(data);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
