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
    const {showEdit, toggleEdit} = this.props
    return (
      <div>
        {showEdit ?
        <div className="modal">
          <div className="modal-main">
            <form onSubmit={this.handleSubmit}>
              <label className="modal-label">Item Name:</label>
              <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
              <button className="button modal-button" type="submit">Edit Item</button>
            </form>
            <button className="button modal-button" onClick={toggleEdit}>Close</button>
          </div>
        </div>:
        null}
      </div>
    )
  }

}
export default EditGroceryForm
