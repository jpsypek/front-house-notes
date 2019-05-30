import React, { Component } from 'react'

class NewGroceryForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ""
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
    const {addItem, toggleNew} = this.props
    addItem("groceries", this.state)
    toggleNew()
    this.setState({name: ""})
  }

  render () {
    const {name} = this.state
    const {showNew, toggleNew} = this.props
    return (
      <div>
      {showNew ?
      <div className="modal">
        <div className="modal-main">
            <form onSubmit={this.handleSubmit}>
              <label className="modal-label">Item Name:</label>
              <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
              <button className="button modal-button" type="submit">Add Item</button>
            </form>
            <button className="button modal-button" onClick={toggleNew}>Close</button>
          </div>
        </div>:
      null}
      </div>
    )
  }

}
export default NewGroceryForm
