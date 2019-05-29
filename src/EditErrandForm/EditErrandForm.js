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
    this.props.editItem("errands", this.state)
    this.props.toggleEdit()
  }

  render () {
    const {name, description} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Errand Title:</label>
        <input name="name" onChange={this.handleChange} value={name} />
        <label>Errand Description:</label>
        <input name="description" onChange={this.handleChange} value={description} />
        <button type="submit">Edit Errand</button>
      </form>
    )
  }

}
export default EditErrandForm
