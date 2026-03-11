import { Request, Response } from 'express'
import { GetAllDirectionsUseCase } from '../../application/GetAllDirectionsUseCase'

export class GetAllDirectionController {
    constructor(private getAllDirectionsUseCase: GetAllDirectionsUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const directions = await this.getAllDirectionsUseCase.execute()
            res.status(200).json(directions)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}