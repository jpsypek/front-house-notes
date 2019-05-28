import React, { Component } from 'react'

class GroceryItem extends Component {

  render () {
    return (
      <div>
        <p>{this.props.name}</p>
      </div>
    )
  }
}
export default GroceryItem
