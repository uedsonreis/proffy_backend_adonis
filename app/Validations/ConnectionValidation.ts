import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidation = {
    schema: schema.create({
        userId: schema.number()
    })
}