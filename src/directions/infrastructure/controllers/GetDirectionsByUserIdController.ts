import { Request, Response } from 'express'
import { GetDirectionsByUserIdUseCase } from '../../application/GetDirectionsByUserIdUseCase'

export class GetDirectionsByUserIdController {
    constructor(private getDirectionsByUserIdUseCase: GetDirectionsByUserIdUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const id_usuario = parseInt(req.params.id_usuario as string, 10)
            const directions = await this.getDirectionsByUserIdUseCase.execute(id_usuario)
            res.status(200).json(directions)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}