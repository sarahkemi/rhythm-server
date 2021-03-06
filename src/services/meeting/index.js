'use strict'

const service = require('feathers-mongoose')
const meeting = require('./meeting-model')
const hooks = require('./hooks')
const authenticationFilter = require('../../filters').authenticationFilter

module.exports = function () {
  const app = this

  const options = {
    Model: meeting
  }

  app.use('/meetings', service(options))

  const meetingService = app.service('/meetings')
  meetingService.before(hooks.before)
  meetingService.after(hooks.after)

  meetingService.filter(authenticationFilter)
}
