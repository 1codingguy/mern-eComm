import { Helmet } from 'react-helmet-async'

interface MetaProps {
  title?: string
  description?: string
  keyword?: string
}

const Meta = ({ title, description, keyword }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keyword} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for cheap',
  keyword: 'electronics, buy electronics, cheap electronics',
}

export default Meta
