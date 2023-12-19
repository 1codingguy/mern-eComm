import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import getErrorMessage from '../utils/getErrorMessage'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams<{
    pageNumber: string
    keyword: string
  }>()

  const { data, isLoading, error } = useGetProductsQuery(
    pageNumber && keyword
      ? { keyword, pageNumber }
      : { keyword, pageNumber: '1' }
  )

  const { products = [], pages = 0, page = 0 } = data || {}

  return (
    <>
      {keyword ? (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          <>{getErrorMessage(error)}</>
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
          <Paginate
            pages={pages}
            page={page}
            isAdmin={false}
            keyword={keyword}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
