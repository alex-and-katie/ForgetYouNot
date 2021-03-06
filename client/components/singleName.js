import React from 'react'
import {connect} from 'react-redux'
import {fetchName} from '../store/singleName'

export class SingleName extends React.Component {
  componentDidMount() {
    const nameId = this.props.match.params.id
    this.props.fetchName(nameId)
  }

  render() {
    const {singleName} = this.props
    return (
      <div>
        <h2>{singleName.name}</h2>
        <p>Location: {singleName.location}</p>
        <p>Date: {singleName.date}</p>
        <p>Meeting Summary: {singleName.meetingSummary}</p>
        <p>Physical Description: {singleName.physicalDescription}</p>
        {/* need to add audioPronunciation in correct format */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleName: state.singleName
  }
}

const mapDispatchToProps = {fetchName}

export default connect(mapStateToProps, mapDispatchToProps)(SingleName)
