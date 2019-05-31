import React, { Component } from 'react'

class CreateUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      houses: [],
      name: "",
      password: "",
      house_id: "",
      showError: false
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/v1/houses`)
      .then(response => response.json())
      .then(houses => this.setState({houses: houses.data}))
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    const {name, password, house_id} = this.state
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: name,
          password: password,
          house_id: house_id
        }
      })
    })
      .then(response => response.json())
      .then(data => this.checkRegistration(data))
      .catch(error=>console.error(error))
  }

  checkRegistration = (response) => {
    const {toggleCreateForm, fetchHouse} = this.props
    if (response.user) {
      localStorage.setItem('token', response.jwt)
      localStorage.setItem('house_id', response.user.house.id)
      toggleCreateForm()
      fetchHouse(response.user.house.id)
    } else {
      this.setState({
        name: "",
        password: "",
        showError: true
      })
    }
  }

  render () {
    const {showCreateForm, toggleCreateForm} = this.props
    const {name, house_id, password, showError} = this.state
    const houseOptions = this.state.houses.map((house) => {
      return <option key={house.id} value={house.id}>{house.attributes.address}</option>
    })
    return (
      <div>
        {showCreateForm ?
          <div className="modal">
            <div className="modal-main">
                <form onSubmit={this.handleSubmit}>
                  <label className="modal-label">Username:</label>
                  <input className="modal-input" name="name" onChange={this.handleChange} value={name} />
                  <label className="modal-label">Password:</label>
                  <input className="modal-input" type="password" name="password" onChange={this.handleChange} value={password} />
                  <label className="modal-label">House:</label>
                  <select name="house_id" value={house_id} onChange={this.handleChange}>
                    <option></option>
                    {houseOptions}
                  </select>
                  <button className="button modal-button" type="submit">Create Account</button>
                </form>
                {showError ? <p>Invalid username, please try again</p> : null}
                <button className="button modal-button" onClick={toggleCreateForm}>Close</button>
              </div>
            </div> :
          null}
      </div>
    )
  }
}

export default CreateUserForm
