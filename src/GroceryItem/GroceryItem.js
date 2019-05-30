import React, { Component } from 'react'
import EditGroceryForm from '../EditGroceryForm/EditGroceryForm'

class GroceryItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false
    }
  }

  toggleEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }
  render () {
    const {name, deleteItem, id} = this.props
    const {showEdit} = this.state
    return (
      <div>
        <h4>{name}</h4>
        <a className="button" href="https://secure.splitwise.com/#/dashboard" rel="noopener noreferrer" target="_blank" onClick={() => deleteItem("groceries", id)}>Purchased?</a>
        <button className="button" onClick={() => deleteItem("groceries", id)}>Delete Item</button>
        <button className="button" onClick={this.toggleEdit}>Edit Item</button>
        <EditGroceryForm {...this.props} toggleEdit={this.toggleEdit} showEdit={showEdit}/>
      </div>
    )
  }
}
export default GroceryItem
