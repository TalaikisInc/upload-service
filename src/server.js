import { join } from 'path'

import express from 'express'
import fileUpload from 'express-fileupload'

import rnd from './rnd'
const port = 3000
const app = express()
const accceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const filePath = process.env.NODE_ENV === 'production' ? '../.env' : '../.env.development'
require('dotenv').config({ path: filePath })

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.post('/', (req, res) => {
  if (process.env.API_KEY === req.body.apiKey) {
    const length = Object.keys(req.files).length
    if (length === 0) {
      res.status(400).json({ err: 'No files were uploaded.' })
    } else if (length === 1) {
      const file = req.files.file
      const ext = file.name.split('.')[1]
      if (accceptedTypes.includes(file.mimetype)) {
        rnd(8, (id) => {
          if (id) {
            const fileName = `${id}.${ext}`
            file.mv(join(__dirname, '../public', fileName), (err) => {
              if (err) {
                res.status(500).json({ err })
              } else {
                res.status(200).json({ id: fileName, status: 'Uploaded.' })
              }
            })
          } else {
            res.status(500).json({ err: 'Wasn\'t able to generate filename.' })
          }
        })
      } else {
        res.status(400).json({ err: 'Wrong file type, only png, jpeg and webp are accepted.' })
      }
    } else {
      res.status(400).json({ err: 'Only one file is allowed for the API.' })
    }
  } else {
    res.status(401).json({ err: 'Wrong API key.' })
  }
})

app.listen(port, (err) => {
  if (err) {
    console.log(`Failed: ${err}`)
  } else {
    console.log(`Listening to port ${port}`)
  }
})

module.exports = app
