const request = require('supertest')
const chai = require('chai')
chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../src/')
const { describe, it } = require('mocha')
const { join } = require('path')

describe('api', () => {
  describe('upload', () => {
    it('upload should work', (done) => {
      request(server).post('/')
        .field('extra_info', '{"apiKey":"test"}')
        .attach('file', join(__dirname, 'mocks', 'image.jpg'))
        .type('form')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err)
          res.body.status.should.eql('Uploaded.')
          done()
        })
    })
  })
})
