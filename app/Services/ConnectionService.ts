import Connection from "App/Models/Connection";

export class ConnectionService {

    public async list() {
        return await Connection.all()
    }

    public async count(): Promise<number> {
        const totalConnections = await Connection.query().count('* as total')
        const { total } = totalConnections[0]
        return total
    }

    public async create(userId: number) {
        return await Connection.create({ userId })
    }

}