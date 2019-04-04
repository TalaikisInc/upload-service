const { join } = require('path')
const sharp = require('sharp')

export const resize = (inputBuffer, width, heigth, out, done) => {
  sharp(inputBuffer)
    .resize(width, heigth)
    .toFile(join(__dirname, '../public', out), (err, info) => {
      done(err, info)
    })
}
