import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidation } from 'App/Validations/ConnectionValidation'
import { connectionService } from 'App/Services'
import { HttpCodes } from 'App/Utils'

export default class ConnectionsController {

    public async index({ response }: HttpContextContract) {
        const total = await connectionService.count()
        return response.status(HttpCodes.OK).json({ total })
    }

    public async store({ request, response }: HttpContextContract) {
        const { userId } = await request.validate(saveValidation)
        const connection = await connectionService.create(userId)
        return response.status(HttpCodes.Created).json(connection)
    }

}
