import Pagination from 'react-bootstrap/Pagination'
import { LinkContainer } from 'react-router-bootstrap'

interface PaginateProps {
  pages: number
  page: number
  isAdmin?: boolean
  // keyword?: string
}

const Paginate = ({ pages, page, isAdmin = false }: PaginateProps) => {
  if (pages > 1) {
    return (
      <Pagination>
        {[...Array(pages).keys()].map(zeroBasedPageNumber => (
          <LinkContainer
            key={zeroBasedPageNumber + 1}
            to={
              !isAdmin
                ? `/page/${zeroBasedPageNumber + 1}`
                : `/admin/productlist/${zeroBasedPageNumber + 1}`
            }
          >
            <Pagination.Item active={zeroBasedPageNumber + 1 === page}>
              {zeroBasedPageNumber + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  }
}

export default Paginate
