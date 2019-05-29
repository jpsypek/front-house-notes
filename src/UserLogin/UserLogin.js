import React, { Component } from 'react'
import './UserLogin.css'

class UserLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      inputName: "",
      notFound: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(users => this.setState({
        users: users.data
      }))
      .catch(error => console.error(error))
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {users, inputName, notFound} = this.state
    const user = users.find((user) => user.attributes.name === inputName)
    user ? this.props.fetchHouse(user.relationships.house.data.id) : this.setState({notFound: !notFound})
  }

  render () {
    const {notFound} = this.state
    return (
      <div className="user-search">
        <p className="instructions">To get started, please search your name in the box below!</p>
        <div id="form">
          <form onSubmit={this.handleSubmit}>
            <input name="inputName" placeholder="Enter your name" value={this.state.inputName} onChange={this.handleChange} />
            <button className="button" type="submit">Search Users</button>
          </form>
        </div>
        { notFound ? <p id="error">No user was found with that name. Please try again.</p> : null}
      </div>
    )
  }
}

export default UserLogin
