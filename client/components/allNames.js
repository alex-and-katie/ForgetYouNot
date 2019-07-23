import React from 'react'
import {connect} from 'react-redux'
import {fetchNames} from '../store/allNames'
import {Link} from 'react-router-dom'

export class AllNames extends React.Component {
  componentDidMount() {
    console.log('id in compDidMount', this.props.match.params.id)
    this.props.fetchNames()
  }

  render() {
    const {allNames} = this.props
    console.log('allNames', allNames)
    return (
      <div className="allNames">
        <h2>All Names</h2>
        <div className="nameList">
          {allNames.map(name => {
            return (
              <Link key={name.id} to="/singleName">
                <li className="singleName" key={name.id}>
                  {name.name}
                </li>
              </Link>
            )
          })}
        </div>
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
