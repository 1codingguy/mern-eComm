import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submit')
  }
  return (
    <FormContainer>
      <>
        <h1>Sign in</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-2'>
            Sign In
          </Button>

          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link to='/register' className='text-decoration-none'>
                Register
              </Link>
            </Col>
        </Row>
        </Form>
      </>
    </FormContainer>
  )
}

export default LoginScreen
