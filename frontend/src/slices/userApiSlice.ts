import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'
import { UserType } from '../../../backend/models/userModel'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query<UserType[], null>({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Users'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
} = usersApiSlice
