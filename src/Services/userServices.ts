import { UserEntry, newUserEntry } from '../@types/index'
import Usuario from '../models/usuario'

export const getUsers = async () => {
    return await Usuario.findAll()
}


export const getUserById = async (id: number) => {
    try {
        return await Usuario.findByPk(id)
    } catch (error) {
        return error
    }
}

export const getUserByEmail = async (email: string) => {
    return await Usuario.findAll({
        where: {
            email: email
        }
    })
}

export const addUser = async (newUserEntry: newUserEntry) => {
    const user = await Usuario.create(newUserEntry)
    return user
}



