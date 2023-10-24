import { ORDERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
    }),
    getOrderById: builder.query({
      query: id => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
    addOrderItems: builder.mutation({
      query: data => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: id => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderItemsMutation,
  useUpdateOrderToPaidMutation,
} = ordersApiSlice
