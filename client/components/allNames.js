import React from 'react'
import {connect} from 'react-redux'
import {fetchNames} from '../store/allNames'
import {Link} from 'react-router-dom'

export class AllNames extends React.Component {
  componentDidMount() {
    this.props.fetchNames()
  }

  render() {
    const {allNames} = this.props
    return (
      <div className="allNames">
        <h2>All Names</h2>
        <div className="nameList">
          {allNames.map(name => {
            return (
              <Link key={name.id} to={`/names/${name.id}`}>
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
