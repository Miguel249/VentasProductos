
import { ProductEntry, newProductEntry } from "../@types";
import Producto from "../models/producto";

export const getProducts = async () => {
    return await Producto.findAll()
}


export const getProductById = async (id: number) => {
    try {
        return await Producto.findByPk(id)
    } catch (error) {
        return error
    }
}

export const addProduct = async (newProductEntry: newProductEntry) => {
    const product = await Producto.create(newProductEntry)
    return product
}