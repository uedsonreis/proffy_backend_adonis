import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from 'App/Validations/ClassValidation'

import Class from 'App/Models/Class'
import User from 'App/Models/User'

import { classService } from '../../Services'
import { HttpCodes } from 'App/Utils'

export default class ClassesController {

    public async index({ request }: HttpContextContract) {
        const { subject, weekDay, time } = request.get()
        return await classService.list(subject, weekDay, time)
    }

    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(saveValidate)
        const { user, objClass, schedules } = body

        const savedObjClass = await classService.create(user as User, objClass as Class, schedules)
        return response.status(HttpCodes.Created).json(savedObjClass)
    }

}