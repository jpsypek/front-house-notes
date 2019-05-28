import React, { Component } from 'react'

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
    const {inputName, notFound} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Please enter your name</label>
          <input name="inputName" placeholder="Enter your name" value={this.state.inputName} onChange={this.handleChange} />
          <button type="submit">Search Users</button>
        </form>
        { notFound ? <p>The entered user was not found. Please try again.</p> : null}
      </div>
    )
  }
}

export default UserLogin
