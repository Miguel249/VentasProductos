export { }

export interface UserEntry {
    user_id: number
    email: string
    name: string
    password: string
}

export interface ProductEntry {
    product_id: number
    nombre: string
    precio: number
    estado: boolean
}

export type newProductEntry = Omit<ProductEntry, 'product_id'>

export type newUserEntry = Omit<UserEntry, 'user_id'>

export type UserWithoutPassword = Omit<UserEntry, 'password'>


declare global {
    export namespace NodeJS {
        export interface ProcessEnv {
            PORT: string
        }
    }

    export namespace Express {
        export interface Request {
            user: {
                id: number
            }
        }
    }
}