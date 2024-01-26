import { Sequelize } from 'sequelize'


const conexion = new Sequelize({
    database: 'personal',
    username: 'root',
    password: 'root',
    port: 3306,
    host: 'localhost',
    dialect: 'mysql'
})

export default conexion
