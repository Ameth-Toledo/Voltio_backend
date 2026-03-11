import { Request, Response } from 'express'
import { UpdateDirectionUseCase } from '../../application/UpdateDirectionUseCase'

export class UpdateDirectionController {
    constructor(private updateDirectionUseCase: UpdateDirectionUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string, 10)
            const direction = await this.updateDirectionUseCase.execute(id, req.body)
            res.status(200).json(direction)
        } catch (error: any) {
            res.status(404).json({ error: error.message })
        }
    }
}