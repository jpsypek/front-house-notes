import React, { Component } from 'react'

class NewErrandForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "",
      description: ""
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
    addItem("errands", this.state)
    toggleNew()
    this.setState({name: "", description: ""})
  }

  render () {
    const {name, description} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Errand Title:</label>
        <input name="name" onChange={this.handleChange} value={name} />
        <label>Errand Description:</label>
        <input name="description" onChange={this.handleChange} value={description} />
        <button type="submit">Add Errand</button>
      </form>
    )
  }

}
export default NewErrandForm
