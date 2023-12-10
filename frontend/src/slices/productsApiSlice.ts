import { PRODUCTS_URL, UPLOADS_URL } from '../constants'
import { apiSlice } from './apiSlice'
import ProductModelType from '@backend/productModelType'

export type GetProductsType = {
  products: ProductModelType[]
  page: number
  pages: number
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<
      GetProductsType,
      { pageNumber: string; keyword: string }
    >({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query<ProductModelType, string>({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'], // stop it from being cached, so that we have fresh data
    }),
    updateProduct: builder.mutation<ProductModelType, ProductModelType>({
      // generic: first arg is return type, second arg is input type
      query: data => {
        return {
          url: `${PRODUCTS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: data => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createProductReview: builder.mutation({
      query: data => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
    }),
    getTopProducts: builder.query<ProductModelType[], number>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice
