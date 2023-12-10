import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/userApiSlice'
import { Types } from 'mongoose'
import UserModelType from '@backend/userModelType'

const UserEditScreen = () => {
  const { id: userId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId ?? '')

  const [updateUser, { isLoading: loadingUpdateUser }] = useUpdateUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPassword(user.password)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id: Types.ObjectId = user?._id

    const updatedUser: Partial<UserModelType> = {
      _id: id,
      name,
      email,
      isAdmin,
      password,
    }

    try {
      await updateUser(updatedUser)
      toast.success('User Updated')
      refetch()
      navigate('/admin/userlist')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <>
          <h1>Edit User</h1>
          {loadingUpdateUser && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              <>{error} </>
            </Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary' className='my-2'>
                Update
              </Button>
            </Form>
          )}
        </>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
