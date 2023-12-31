import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice'
import ProductModelType from '@backend/productModelType'
import getErrorMessage from '../../utils/getErrorMessage'
import { Types } from 'mongoose'

const ProductEditScreen = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId ?? '')

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
    }
  }, [product])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedProduct: ProductModelType = {
      _id: new Types.ObjectId(productId),
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } as ProductModelType

    const result = await updateProduct(updatedProduct)

    if ('error' in result) {
      toast.error(getErrorMessage(error))
    } else {
      toast.success('update product success')
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    formData.append('image', e.target.files![0])
    try {
      const result = await uploadProductImage(formData).unwrap()
      console.log(result)
      toast.success(result.message)
      setImage(result.image)
      console.log(result.image)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
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

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={e => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type='file'
                  // label='choose file'
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>

              {loadingUpload && <Loader />}

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={e => setCountInStock(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></Form.Control>
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

export default ProductEditScreen
