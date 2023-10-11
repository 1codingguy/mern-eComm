import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice.js'

const ProductScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId ?? '')

  const addToCartHandler = () => {
    // qty is added but it's not part of ProductType
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating ?? 0}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroupItem>{product?.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product && product?.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product && product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as='select'
                          value={qty}
                          onChange={event => setQty(Number(event.target.value))}
                        >
                          {[...Array(10).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product?.countInStock == 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
