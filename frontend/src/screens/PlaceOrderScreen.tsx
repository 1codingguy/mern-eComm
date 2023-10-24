import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { RootState } from '../store'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [navigate, cart.shippingAddress.address, cart.paymentMethod])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>column</Col>

        <Col md={4}>column</Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
