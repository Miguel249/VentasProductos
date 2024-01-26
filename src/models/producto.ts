import { DataTypes } from "sequelize";
import conexion from "../config/conexion";


const Producto = conexion.define('productos', {

    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    estado: DataTypes.TINYINT

}, {
    tableName: "productos",
    createdAt: true,
    updatedAt: true
})


export default Producto