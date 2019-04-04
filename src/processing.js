const { join } = require('path')
const sharp = require('sharp')
const imagemin = require('imagemin')
const imageminOptipng = require('imagemin-optipng')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminSvgo = require('imagemin-svgo')
const optimizedPath = join(__dirname, '../public', 'images')

export const resize = (inputBuffer, width, heigth, out, done) => {
  sharp(inputBuffer)
    .resize(width, heigth)
    .toFile(join(__dirname, '../public', out), (err, info) => {
      done(err, info)
    })
}

export const png = async (imagesArr, done) => {
  await imagemin(imagesArr, optimizedPath, {
    use: [
      imageminOptipng({
        optimizationLevel: 4,
        bitDepthReduction: true,
        colorTypeReduction: true,
        paletteReduction: true
      })
    ]
  }).then(() => {
    done(false)
  })
}

export const gif = async (imagesArr, done) => {
  await imagemin(imagesArr, optimizedPath, {
    use: [
      imageminGifsicle({
        interlaced: false,
        optimizationLevel: 2,
        colors: 256
      })
    ]
  }).then(() => {
    done(false)
  })
}

export const jpg = async (imagesArr, done) => {
  await imagemin(imagesArr, optimizedPath, {
    use: [
      imageminMozjpeg({
        quality: 75,
        progressive: true,
        targa: false,
        revert: false,
        dcScanOpt: 1,
        trellis: true,
        trellisDC: true,
        quantBaseline: false
      })
    ]
  }).then(() => {
    done(false)
  })
}

export const svg = async (imagesArr, done) => {
  await imagemin(imagesArr, optimizedPath, {
    use: [
      imageminSvgo({
        plugins: [
          { removeViewBox: true }
        ]
      })
    ]
  }).then(() => {
    done(false)
  })
}
