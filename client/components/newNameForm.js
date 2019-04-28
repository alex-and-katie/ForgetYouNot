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

  handleReceivedData(evt) {
    const {data} = evt //data is BLOB, eventually may want to send it back to database on submit, possibly by storing it on state
    console.log('Data from ondataavailable event', data)
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
    this.recorder = new MediaRecorder(stream) //recording has start, stop, and ondataavailable
    this.recorder.ondataavailable = evt => this.handleReceivedData(evt)
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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <h2>Grab that Name!</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className="row">
                <div className="col-sm">
                  <label htmlFor="name">Name:</label>
                </div>
                <div className="col-sm">
                  <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    placeholder="Quick! Before you forget!"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <label htmlFor="meetingSummary">Meeting Summary:</label>
              <input
                className="longForm"
                name="meetingSummary"
                type="text"
                placeholder="Summary"
                value={this.state.meetingSummary}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="physicalDescription">Physical Description:</label>
              <input
                name="physicalDescription"
                type="text"
                // placeholder=""
                value={this.state.physicalDescription}
                onChange={this.handleChange}
              />
              <label htmlFor="location">Location:</label>
              <input
                name="location"
                type="text"
                placeholder="Where'd ya meet?"
                value={this.state.location}
                onChange={this.handleChange}
              />
              <label htmlFor="geoTaggedLocation">Mapped as:</label>
              <p className="longForm">{this.state.geoTaggedLocation}</p>
              <br />
              <label htmlFor="date">Date:</label>
              <p className="longForm">{this.state.date}</p>
              <br />
              <label htmlFor="audioPronunciation">Record Name</label>
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
            <br />

            <button id="checkoutSubmitBtn" type="submit">
              Save that Name!
            </button>
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
