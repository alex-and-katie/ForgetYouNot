import React from 'react'
import {connect} from 'react-redux'
import {fetchNames} from '../store/allNames'

export class AllNames extends React.Component {
  componentDidMount() {
    this.props.fetchNames()
  }

  render(){
    console.log(this.props)
    return(
      <h1>allNames</h1>
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
