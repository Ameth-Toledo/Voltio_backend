import { Request, Response } from 'express'
import { GetDirectionByIdUseCase } from '../../application/GetDirectionByIdUseCase'

export class GetDirectionByIdController {
    constructor(private getDirectionByIdUseCase: GetDirectionByIdUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string, 10)
            const direction = await this.getDirectionByIdUseCase.execute(id)
            res.status(200).json(direction)
        } catch (error: any) {
            res.status(404).json({ error: error.message })
        }
    }
}