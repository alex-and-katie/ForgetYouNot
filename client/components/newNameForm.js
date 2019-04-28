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
      pronunciation: '',
      location: '',
      geoTaggedLocation: '', //get from API
      date: '',
      audioPronunciation: '', //get from API
      recordingStatus: false,
      audioURL: ''
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
      audioURL: recordedAudioURL
    })
  }

  // handleReceivedData(evt) {
  //   const {data} = evt
  //   const recordedAudioURL = URL.createObjectURL(data)
  // }

  async handleClickStart(evt) {
    this.setState({
      recordingStatus: true
    })
    //get audio stream from user's mic //also prompts permission for mic //returns a stream
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    this.recorder = new MediaRecorder(stream) //recording has start, stop, and ondataavailable
    this.recorder.ondataavailable = evt => this.handleReceivedData(evt)
    this.recorder.start()
    //this.recorder.ondataavailable = function set on class (when we have data, we call a function with this data as a parameter)
    //assign this data to audio tag
    //onrecordingready ==> thing receiving data
    //grab this new url and hook it into the audio tag
  }

  handleClickStop(evt) {
    this.setState({
      recordingStatus: false
    })
    this.recorder.stop()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.props.history.push('/checkout/confirmation') //can redirect to confirmation page
    this.props.createName(this.state)
    this.setState(this.initialState)
  }

  render() {
    return (
      <div className="checkoutForm">
        <h2>Grab that Name!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              className="longForm"
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Quick! Before you forget!"
              onChange={this.handleChange}
            />
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
            <label htmlFor="pronunciation">Pronunciation:</label>
            <input
              name="pronunciation"
              type="text"
              // placeholder=""
              value={this.state.pronunciation}
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
                <button onClick={this.handleClickStart} id="start">
                  Start
                </button>{' '}
                <button onClick={this.handleClickStop} id="stop">
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
    )
  }
}

//const mapDispatchToProps = {thunkName}
const mapDispatchToProps = dispatch => ({
  createName: name => dispatch(createName(name))
})

export default connect(null, mapDispatchToProps)(NewNameForm)
