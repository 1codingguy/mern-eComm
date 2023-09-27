import express from 'express'
import dotenv from "dotenv"
import products from './data/products.js'

dotenv.config()

const port = process.env.PORT || 6900
const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(({ _id }) => _id === req.params.id)
  return product ? res.json(product) : res.send('Product not found')
})
