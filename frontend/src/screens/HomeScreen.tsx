import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()

  const { data, isLoading, error } = useGetProductsQuery(
    pageNumber ? { pageNumber } : { pageNumber: '1' }
  )

  const products = data?.products

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products &&
              products.map(product => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={String(product._id)}>
                    <Product product={product} />
                  </Col>
                )
              })}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
