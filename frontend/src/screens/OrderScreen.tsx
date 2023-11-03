import { useParams, Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  DISPATCH_ACTION,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'

const OrderScreen = () => {
  const { id: orderId } = useParams<{ id: string }>()
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId)

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()

  // paypalDispatch is just a dispatch(), usePayPalScriptReducer has the same API as useReducer()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery({})

  const { userInfo } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        // reload the JS SDK script with new params
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        })
        // dispatch an action to set the loading state to pending
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript()
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal])

  const onApprove = (data, action) => {
    // Capture the funds from the transaction
    // It means to charge the payment on Paypal
    // action.order.capture() returns a promise
    return action.order.capture().then(async function (details) {
      try {
        // Update our server that the payment has been successful
        await payOrder({ orderId, details })
        refetch()
        toast.success('Payment successful')
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    })
  }

  // const onApproveTest = async () => {
  //   // since it's a test and no `details` is returned from paypal, we just pass an object with payer: {}
  //   await payOrder({ orderId, details: { payer: {} } })
  //   refetch()
  //   toast.success('Payment successful')
  // }

  const onError = error => {
    toast.error(error.message)
  }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // currency_code: 'USD',
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId
      })
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder({ orderId })
      refetch()
      toast.success('Order delivered')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <Message variant='danger'>{error}</Message>
  }
  return (
    <>
      <h1>{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  <>Delivered on {order.deliveredAt}</>
                </Message>
              ) : (
                <Message variant='danger'>
                  <>Not Delivered</>
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  <>Paid on {order.paidAt}</>
                </Message>
              ) : (
                <Message variant='danger'>
                  <>Not Paid</>
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='danger'>
                  <>Order is empty</>
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty! * item.price!).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      {/* <div>
                        <Button
                          onClick={onApproveTest}
                          style={{ marginBottom: '10px' }}
                        >
                          Test Pay Order
                        </Button>
                      </div> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}

              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverOrderHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
