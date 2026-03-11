import { Request, Response } from 'express'
import { CreateDirectionUseCase } from '../../application/CreateDirectionUseCase'

export class CreateDirectionController {
    constructor(private createDirectionUseCase: CreateDirectionUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const direction = await this.createDirectionUseCase.execute(req.body)
            res.status(201).json(direction)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}