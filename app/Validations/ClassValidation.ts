import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidate = {
    schema: schema.create({
        user: schema.object().members({
            name: schema.string(),
            avatar: schema.string(),
            whatsapp: schema.string(),
            bio: schema.string()
        }),
        objClass: schema.object().members({
            subject: schema.string(),
            cost: schema.number()
        }),
        schedules: schema.array().members(schema.object().members({
            weekDay: schema.number(),
            from: schema.string(),
            to: schema.string()
        }))
    })
}