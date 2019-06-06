import React from 'react'
import {connect} from 'react-redux'
import {fetchNames} from '../store/allNames'

export class AllNames extends React.Component {
  componentDidMount() {
    this.props.fetchNames()
  }



}





export default connect(null, null)(AllNames)
