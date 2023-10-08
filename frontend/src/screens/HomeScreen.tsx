import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  // TODO: deal with products type later
  const { data: products, isLoading, error } = useGetProductsQuery(null)
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
            {products.map(product => {
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
