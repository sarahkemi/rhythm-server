/* eslint-env mocha */
'use strict'

const assert = require('assert')
const request = require('request')
const winston = require('winston')
const app = require('../src/app')

before(function (done) {
  global.app = app
  winston.log('info', 'mongo:', global.app.get('mongodb'))
  global.server = app.listen(3000)
  global.server.once('listening', done)
})

after(function (done) {
  winston.log('info', 'Finishing up!')
  this.timeout(7000)
  global.socket.disconnect()
  global.server.close(done)
})

describe('Feathers application tests', function () {
  describe('404', function () {
    it('shows a 404 JSON error without stack trace', function (done) {
      request({
        url: 'http://localhost:3000/path/to/nowhere',
        json: true
      }, function (err, res, body) {
        assert.equal(res.statusCode, 404)
        assert.equal(body.code, 404)
        assert.equal(body.message, 'Page not found')
        assert.equal(body.name, 'NotFound')
        done(err)
      })
    })
  })
})
