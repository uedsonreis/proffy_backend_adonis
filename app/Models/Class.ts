import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Class extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public subject: string

    @column()
    public cost: number

    @column({ serializeAs: 'userId' })
    public userId: number

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

}