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
      recordingStatus: false
    }
    this.state = this.initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      date: new Date().toJSON().slice(0, 10),
      geoTaggedLocation: 'Feature coming soon!'
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleClick(evt) {
    // evt.preventDefault()
    console.log('button clicked!')
    this.setState({
      ...this.state,
      recordingStatus: !this.recordingStatus
    })
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
                <button id="record" disabled>
                  Record audio
                </button>{' '}
                <button id="stop" disabled>
                  Stop
                </button>
              </p>
              <p>
                <audio id="audio" controls />
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
