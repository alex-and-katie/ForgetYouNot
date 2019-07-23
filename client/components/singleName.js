import React from 'react'
import {connect} from 'react-redux'
import {fetchName} from '../store/singleName'

export class SingleName extends React.Component {
  componentDidMount() {
    const nameId = this.props.match.params.id
    this.props.fetchName(nameId)
  }

  render() {
    const {singleName} = this.props;
    console.log('singleName', singleName)
    return (
      <div>
        <h2>Single Name</h2>
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
