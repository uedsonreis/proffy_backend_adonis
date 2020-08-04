import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class ClassSchedule extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public weekDay: number

    @column()
    public from: number

    @column()
    public to: number

    @column()
    public classId: number

    @belongsTo(() => Class)
    public class: BelongsTo<typeof Class>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

}