import React, { Component } from 'react'

class EditErrandForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      description: props.description,
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
    editItem("errands", this.state)
    toggleEdit()
  }

  render () {
    const {name, description} = this.state
    const {showEdit, toggleEdit} = this.props
    return (
      <div>
        {showEdit ?
        <div className="modal">
          <div className="modal-main">
            <form onSubmit={this.handleSubmit}>
              <label className="modal-label">Errand Title:</label>
              <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
              <label className="modal-label">Errand Description:</label>
              <textarea type="text-box" className="modal-input edit-input" name="description" onChange={this.handleChange} value={description} />
              <button className="button modal-button" type="submit">Edit Errand</button>
            </form>
            <button className="button modal-button" onClick={toggleEdit}>Close</button>
          </div>
        </div>:
        null}
      </div>
    )
  }

}
export default EditErrandForm
