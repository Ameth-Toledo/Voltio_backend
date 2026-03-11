import { Router, Request, Response } from 'express'
import { CreateDirectionController } from '../controllers/CreateDirectionController'
import { DeleteDirectionController } from '../controllers/DeleteDirectionController'
import { GetAllDirectionController } from '../controllers/GetAllDirectionController'
import { GetDirectionByIdController } from '../controllers/GetDirectionByIdController'
import { GetDirectionsByUserIdController } from '../controllers/GetDirectionsByUserIdController'
import { UpdateDirectionController } from '../controllers/UpdateDirectionController'
import { jwtMiddleware } from '../../../core/security/jwt_middleware'

export function configureDirectionRoutes(
    createCtrl: CreateDirectionController,
    getAllCtrl: GetAllDirectionController,
    getByIdCtrl: GetDirectionByIdController,
    getByUserIdCtrl: GetDirectionsByUserIdController,
    updateCtrl: UpdateDirectionController,
    deleteCtrl: DeleteDirectionController
): Router {
    const router = Router()

    router.get('/directions', jwtMiddleware, (req: Request, res: Response) => getAllCtrl.handle(req, res))
    router.get('/directions/:id', jwtMiddleware, (req: Request, res: Response) => getByIdCtrl.handle(req, res))
    router.get('/usuarios/:id_usuario/directions', jwtMiddleware, (req: Request, res: Response) => getByUserIdCtrl.handle(req, res))
    router.post('/directions', jwtMiddleware, (req: Request, res: Response) => createCtrl.handle(req, res))
    router.put('/directions/:id', jwtMiddleware, (req: Request, res: Response) => updateCtrl.handle(req, res))
    router.delete('/directions/:id', jwtMiddleware, (req: Request, res: Response) => deleteCtrl.handle(req, res))

    return router
}