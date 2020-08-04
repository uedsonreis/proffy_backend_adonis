import Database from '@ioc:Adonis/Lucid/Database'

import { convertHourToMinutes } from 'App/Utils'

import ClassSchedule from "App/Models/ClassSchedule"
import Class from "App/Models/Class"
import User from "App/Models/User"
import ErrorOnSaveClassException from 'App/Exceptions/ClassException'

export class ClassService {

    public async list(subject?: string, weekDay?: string, time?: string) {

        let query = Class.query()

        if (weekDay) {
            query = query.whereExists(function(builder) {
                const subQuery = builder.select('class_schedules.*').from('class_schedules')
                .whereRaw('class_schedules.class_id = classes.id')
                .whereRaw('class_schedules.week_day = ??', [Number(weekDay)])
                
                if (time) {
                    const timeInMinutes = convertHourToMinutes(time as string)
                    subQuery.whereRaw('class_schedules.from <= ??', [timeInMinutes])
                    .whereRaw('class_schedules.to > ??', [timeInMinutes])
                }
            })
        }
        
        if (subject) {
            query = query.where({ subject })
        }

        const classes = await query.preload('user')

        return classes
    }

    public async create(user: User, objClass: Class, schedules: any[]) {
        const trx = await Database.beginGlobalTransaction()

        try {
            const savedUser = await User.create({ ...user })
            const savedObjClass = await Class.create({ ...objClass, userId: savedUser.id })
    
            const unsavedSchedules = schedules.map((item: { weekDay: number, from: string, to: string }) => {
                return {
                    classId: savedObjClass.id,
                    weekDay: item.weekDay,
                    from: convertHourToMinutes(item.from),
                    to: convertHourToMinutes(item.to),
                }
            })
    
            await ClassSchedule.createMany(unsavedSchedules)

            trx.commit()
            return savedObjClass
            
        } catch (error) {
            trx.rollback()
            console.error(error)
            throw new ErrorOnSaveClassException(error.message)
        }
    }

}