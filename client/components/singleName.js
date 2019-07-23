import React from 'react'
import {connect} from 'react-redux'
import {fetchName} from '../store/singleName'

export class SingleName extends React.Component {
  componentDidMount() {
    this.props.fetchName()
  }

  render() {
    console.log('PROPS IN SINGLENAME', this.props)
    return(
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
