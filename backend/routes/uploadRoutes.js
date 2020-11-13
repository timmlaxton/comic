import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.filedname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

function checkFilteType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if(extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb)
 {
   checkFilteType(file, cb)
 }})

 router.post('/', upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`)
 })


export default router