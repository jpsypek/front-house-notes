import React, { Component } from 'react'
import './NewErrandForm.css'

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
    const {showNew, toggleNew} = this.props
    return (
        <div>
        {showNew ?
        <div className="modal">
          <div className="modal-main">
            <form onSubmit={this.handleSubmit}>
              <label className="modal-label">Errand Title:</label>
              <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
              <label className="modal-label">Errand Description:</label>
              <textarea className="modal-input" name="description" onChange={this.handleChange} value={description} />
              <button className="button modal-button" type="submit">Add Errand</button>
            </form>
            <button className="button modal-button" onClick={toggleNew}>Close</button>
          </div>
        </div> :
        null}
      </div>
    )
  }

}
export default NewErrandForm
