import React, { Component } from 'react'

class EditGroceryForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      id: props.id
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {editItem, toggleEdit} = this.props
    editItem("groceries", this.state)
    toggleEdit()
  }

  render () {
    const {name} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Item Name:</label>
        <input name="name" onChange={this.handleChange} value={name} />
        <button type="submit">Edit Item</button>
      </form>
    )
  }

}
export default EditGroceryForm
