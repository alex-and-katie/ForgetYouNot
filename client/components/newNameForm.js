import React from 'react'
import {connect} from 'react-redux'
import {createName} from '../store/name'

export class NewNameForm extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      name: '',
      meetingSummary: '',
      physicalDescription: '',
      location: '',
      geoTaggedLocation: '', //get from API
      date: '',
      audioPronunciation: '', //get from API
      recordingStatus: false,
      audioURL: '',
      startDisabled: false,
      stopDisabled: true
    }
    this.state = this.initialState
    this.recorder = null

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleClickStop = this.handleClickStop.bind(this)
    this.handleReceivedData = this.handleReceivedData.bind(this)
  }

  componentDidMount() {
    this.setState({
      date: new Date().toJSON().slice(0, 10),
      geoTaggedLocation: 'Feature coming soon!'
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleReceivedData(dataAvailableEvent) {
    const {data} = dataAvailableEvent //data is BLOB
    console.log('Data from dataavailable event', data)
    const recordedAudioURL = URL.createObjectURL(data)
    console.log('recordedAudioURL:', recordedAudioURL)
    this.setState({
      audioURL: recordedAudioURL,
      audioPronunciation: data
    })
  }

  async handleClickStart(evt) {
    this.setState({
      recordingStatus: true,
      startDisabled: true,
      stopDisabled: false
    })
    //get audio stream from user's mic //also prompts permission for mic //returns a stream
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    this.recorder = new MediaRecorder(stream) //recorder has start, stop, and ondataavailable
    this.recorder.ondataavailable = dataAvailableEvent =>
      this.handleReceivedData(dataAvailableEvent) //ondataavailable listener (method on instance) listens for dataAvailableEvent to fire, passes dataAvailableEvent to our callback function handleReceivedData
    this.recorder.start()
  }

  handleClickStop(evt) {
    this.setState({
      recordingStatus: false,
      startDisabled: false,
      stopDisabled: true
    })
    this.recorder.stop()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.props.history.push('/checkout/confirmation') //can redirect to confirmation page
    this.props.createName(this.state)
    this.setState({
      ...this.initialState,
      date: new Date().toJSON().slice(0, 10),
      geoTaggedLocation: 'Feature coming soon!'
    })
  }

  render() {
    return (
      <div className="formComponent">
        <h2 className="formHeader">Grab that Name!</h2>
        <div className="newNameForm">
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className="formItem">
                <label htmlFor="name">Name:</label>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Before you forget :)"
                  onChange={this.handleChange}
                />
              </div>
              <div className="formItem">
                <label htmlFor="meetingSummary">Meeting Summary:</label>
                <input
                  className="input"
                  name="meetingSummary"
                  type="text"
                  placeholder="Meet Cute? Meet Ugly?"
                  value={this.state.meetingSummary}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formItem">
                <label htmlFor="physicalDescription">
                  Physical Description:
                </label>
                <input
                  name="physicalDescription"
                  type="text"
                  placeholder="Recognize 'em"
                  value={this.state.physicalDescription}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formItem">
                <label htmlFor="location">Location:</label>
                <input
                  name="location"
                  type="text"
                  placeholder="Where'd ya meet?"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </div>
              {/* <div className="formItem">
                <label htmlFor="geoTaggedLocation">Mapped as:</label>
                <p className="longForm">{this.state.geoTaggedLocation}</p>
              </div> */}
              <div className="formItem">
                <label htmlFor="date">Date:</label>
                <input value={this.state.date} readOnly />
              </div>
              <label id="recordName" htmlFor="audioPronunciation">
                Record Name:
              </label>

              {/* audio */}
              <div className="audioDiv">
                <div>
                  <p>
                    <button
                      type="button"
                      onClick={this.handleClickStart}
                      id="start"
                      disabled={this.state.startDisabled}
                    >
                      Start
                    </button>{' '}
                    <button
                      type="button"
                      onClick={this.handleClickStop}
                      id="stop"
                      disabled={this.state.stopDisabled}
                    >
                      Stop
                    </button>
                  </p>
                  <p>
                    <audio src={this.state.audioURL} id="audio" controls />
                  </p>
                </div>
              </div>
              {/* above is audio */}
            </div>
            <div className="submitDiv">
              <button id="checkoutSubmitBtn" type="submit">
                Save that Name!
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

//const mapDispatchToProps = {thunkName}
const mapDispatchToProps = dispatch => ({
  createName: name => dispatch(createName(name))
})

export default connect(null, mapDispatchToProps)(NewNameForm)
