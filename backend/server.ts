import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const port = process.env.PORT || 6900

connectDB() // connect to MongoDB

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running')
})

//
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// __dirname is not available in ES6 module, so we need to use path.resolve()
const __dirname = path.resolve() // __dirname is the current directory

// make the uploads folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})
