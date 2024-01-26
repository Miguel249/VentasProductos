import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userservice from '../Services/userServices'
import * as productservice from '../Services/productService'


const secretKey: any = process.env.SECRETKEY
const routes = express.Router()

routes.get('/users', async (req, res) => {
    const token = req.query.token as string
    if (!token) {
        throw new Error()
    }
    const decoded = jwt.verify(token, secretKey) as { email: string }
    const data = await userservice.getUsers()
    res.send(data)
})

routes.get('/users/:id', async (req, res) => {
    const user = await userservice.getUserById(+req.params.id)
    res.send(user)
})

routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let user = JSON.parse(JSON.stringify(await userservice.getUserByEmail(email)))
        if (user.length == 0) {
            return res.status(401).json('Usuario no encontrado')
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password)
        if (!passwordMatch) {
            return res.status(401).json('No autenticado')
        } else {
            var token = jwt.sign({ email: email }, secretKey, { expiresIn: 60 * 30 })
            var iduser = user[0].user_id

            res.setHeader('Authorization', token)

            var result = { token, iduser }
            return res.status(200).json(result)
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json('Error en el servidor')
    }

})

routes.post('/', async (req, res) => {
    const { email, name, password } = req.body
    console.log(email, name, password)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt!)
    const data = {
        email,
        name,
        password: hash
    }
    await userservice.addUser(data)
    res.status(200).json({ message: 'Usuario Registrado' })
})

routes.get('/products', async (req, res) => {
    const data = await productservice.getProducts()
    res.send(data)
})

routes.post('/newproduct', async (req, res) => {
    const { nombre, precio, estado } = req.body
    const data = {
        nombre,
        precio,
        estado
    }
    await productservice.addProduct(data)
    res.status(200).json({ message: 'Producto Registrado' })
})




export default routes