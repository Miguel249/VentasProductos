import { DataTypes } from "sequelize";
import conexion from "../config/conexion";


const Usuario = conexion.define('usuarios', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING

}, {
    tableName: "usuarios",
    createdAt: true,
    updatedAt: true
})


export default Usuario