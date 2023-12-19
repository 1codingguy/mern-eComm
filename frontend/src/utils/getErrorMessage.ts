import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    // Check if it's FetchBaseQueryError
    if ('status' in error && 'data' in error) {
      const fetchError = error as FetchBaseQueryError
      if (typeof fetchError.data === 'string') {
        return fetchError.data
      }
      return JSON.stringify(fetchError.data)
    }

    // Check if it's SerializedError
    if ('name' in error && 'message' in error && 'stack' in error) {
      const serializedError = error as SerializedError
      return serializedError.message || 'Error occurred'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

export default getErrorMessage

// const getErrorMessage = (error: unknown) => {
//   if (error instanceof Error) {
//     if ('data' in error) {
//       return error.data as string
//     }

//     if ('error' in error) {
//       return error.error as string
//     }

//     if (error.message) {
//       return error.message as string
//     }
//   }

//   return 'Unknown error'
// }

// export default getErrorMessage
