import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  // cb is the callback
  destination(req, file, cb) {
    // null is for error, we don't have an error, so put a null here
    // 'uploads/' is the folder we want to upload to
    cb(null, 'uploads/')
  },
  // describe how the file should be named and formatted
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (
  file: Express.Multer.File,
  cb: (error: Error | null, result: boolean) => void
) => {
  const filetypes = /jpg|jpeg|png/
  // test() tests if the file extension matches any of the filetypes

  // extname() returns the extension of the path
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  // mimetype is the file type
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    // null is for error
    cb(new Error('Images only!'), false)
    // app will crash with the following line
    // null is for error
    // cb('Images only!')
  }
}

const upload = multer({
  storage,
})

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    image: `/${req?.file?.path}`,
    message: 'Image uploaded successfully',
  })
})

export default router
