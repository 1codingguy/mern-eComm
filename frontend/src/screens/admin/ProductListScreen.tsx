import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../slices/productsApiSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'

const ProductListScreen = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()

  const { data, error, isLoading, refetch } = useGetProductsQuery(
    pageNumber ? { pageNumber } : { pageNumber: '1' }
  )

  const { products = [], pages = 0, page = 0 } = data || {}

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id: string) => {
    if (window.confirm('Confirm delete product?')) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success('delete product success')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('Confirm create new product?')) {
      try {
        await createProduct({})
        refetch()
        toast.success('create product success')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm my-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          <>{error} </>
        </Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => {
                const productId = String(product._id)
                return (
                  <tr key={productId}>
                    <td>{productId}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${productId}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(productId)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
