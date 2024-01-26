import "dotenv/config";
import express from 'express'
import routes from "./routes/routes";
import cors from 'cors'
import conexion from "./config/conexion";
const app = express()
const port = Number(process.env.PORT);

app.use(cors())
app.use(express.json())
app.use('/', routes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

try {
    conexion.authenticate()
    console.log('database online')
} catch (error: any) {
    throw new Error(error)
}

export default app
