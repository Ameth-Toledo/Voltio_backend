import { Request, Response } from 'express'
import { DeleteDirectionUseCase } from '../../application/DeleteDirectionUseCase'

export class DeleteDirectionController {
    constructor(private deleteDirectionUseCase: DeleteDirectionUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string, 10)
            await this.deleteDirectionUseCase.execute(id)
            res.status(204).send()
        } catch (error: any) {
            res.status(404).json({ error: error.message })
        }
    }
}