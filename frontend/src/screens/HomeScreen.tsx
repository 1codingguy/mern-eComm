import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import { ProductType } from '../../../backend/models/productModel'

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[] | []>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<ProductType[]>('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={String(product._id)}>
              <Product product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomeScreen
