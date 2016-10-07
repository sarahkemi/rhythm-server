const Sibilant = require('sibilant-webaudio')
const alert = require('alerts')
const getUserMedia = require('getusermedia')
const attachmediastream = require('attachmediastream')
const socket = require('socketio')

getUserMedia(function (err, stream) {
  if (err) {
    console.log('couldnt get user media!', err)
    alert('Sibilant couldnt get your user media. give it access to audio and try again!')
    throw err
  } else {
    console.log('got a stream!')
    attachmediastream(stream, document.querySelector('#vid video'))
    document.querySelector('#vid video').muted = true
    var speakingEvents = new Sibilant(stream, {passThrough: false})
    //make a new meeting, add person to meeting
    speakingEvents.bind('speaking', function () {
      document.querySelector('#vid video').style.border = '10px solid #27ae60'
      console.log('speaking!')
      //send back speaking events to server
    })

    speakingEvents.bind('stoppedSpeaking', function (data) {
      document.querySelector('#vid video').style.border = '10px solid #555'
    })
  }
})
