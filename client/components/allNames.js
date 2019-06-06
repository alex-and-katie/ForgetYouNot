import React from 'react'
import {connect} from 'react-redux'
import {fetchNames} from '../store/allNames'

export class AllNames extends React.Component {
  componentDidMount() {
    this.props.fetchNames()
  }

  render() {
    const {allNames} = this.props
    return (
      <div>
        <h2>All Names</h2>
        <ul>
          {allNames.map(name => {
            return <li key={name.id}>{name.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allNames: state.allNames
  }
}

const mapDispatchToProps = {fetchNames}

export default connect(mapStateToProps, mapDispatchToProps)(AllNames)
