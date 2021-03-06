/* eslint-env mocha */

'use strict'

const assert = require('assert')
const dropDatabase = require('../../shared/global-before').dropDatabase

describe('activate meeting hook', function () {
  var d1 = new Date()
  var d2 = d1
  d2 = d2.setDate(d2.getDate() - 2)

  var endedMeeting = {
    _id: 'activate-meeting-hook',
    participants: [],
    startTime: d2,
    endTime: d1,
    active: false
  }

  before(function (done) {
    dropDatabase().then(() => {
      global.app.service('meetings').create(endedMeeting)
            .then(function (meeting) {
              assert(meeting.active === false)
              done()
            })
    }).catch((err) => { done(err) })
  })

  after(function (done) {
    global.app.service('meetings').patch(endedMeeting._id, {
      participants: []
    }).then((meeting) => {
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('sets an empty meeting active after a participant joins', function (done) {
    global.app.service('meetings').patch(endedMeeting._id, {
      participants: ['p1']
    }).then(function (meeting) {
      assert(meeting.active === true)
      assert(meeting.endTime === null)
      done()
    }).catch(function (err) {
      done(err)
    })
  })
})
