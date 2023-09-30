import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connection =
      process.env.MONGO_URI && (await mongoose.connect(process.env.MONGO_URI))

    if (connection) {
      console.log(`MongoDB connected: ${connection.connection.host}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`)
    }
    process.exit(1)
  }
}

export default connectDB
