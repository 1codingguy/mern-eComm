import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormControl,
  Button,
  Card,
} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { RootState } from '../store'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { CartItem } from '../slices/cartSlice'
import ProductModelType from '@backend/productModelType'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state: RootState) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = async (product: ProductModelType, qty: number) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = async (id: CartItem['_id']) => {
    dispatch(removeFromCart({ id }))
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            <>
              Your cart is empty <Link to='/'>Go Back</Link>
            </>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(cartItem => (
              <ListGroup.Item key={String(cartItem._id)}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={cartItem.image}
                      alt={cartItem.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
                  </Col>
                  <Col md={2}>${cartItem.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as='select'
                      value={cartItem.qty}
                      onChange={event =>
                        addToCartHandler(cartItem, Number(event.target.value))
                      }
                    >
                      {[...Array(cartItem.countInStock).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(cartItem._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
