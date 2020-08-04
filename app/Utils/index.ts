export const HttpCodes = {
    OK:             200,
    Created:        201,
    NoContent:      204,
    BadRequest:     400,
    NotFound:       404,
    InternalError:  500,
}

const hourToMinute = 60

export function convertHourToMinutes(time: string) {
    if (time.includes(':')) {
        const [hour, minutes] = time.split(':').map(Number)
        return (hour * hourToMinute) + minutes
    }
    return Number(time) * hourToMinute
}
