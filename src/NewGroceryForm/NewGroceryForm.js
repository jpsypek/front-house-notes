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
    this.props.addGrocery(this.state)
  }

  render () {
    const {name} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Item Name:</label>
        <input name="name" onChange={this.handleChange} value={name} />
      </form>
    )
  }

}
export default NewGroceryForm
