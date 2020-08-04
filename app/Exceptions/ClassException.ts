import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpCodes } from 'App/Utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new ClassException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ErrorOnSaveClassException extends Exception {

    constructor(message: string) {
        super(message, HttpCodes.BadRequest)
    }

    public async handle(error: this, { response }: HttpContextContract) {
        return response.status(error.status).send(`Error on save a new Class: ${error.message}`)
    }
    
}
