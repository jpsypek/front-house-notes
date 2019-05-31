import React, { Component } from 'react'
import './UserLogin.css'
import CreateUserForm from '../CreateUserForm/CreateUserForm'

class UserLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputName: "",
      password: "",
      notFound: false,
      showCreateForm: false
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
    const {password, inputName} = this.state
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: inputName,
          password: password
        }
      })
    })
      .then(response => response.json())
      .then(data => this.checkUser(data))
      .catch(error => console.error(error))
    }

    checkUser = (data) => {
      data.user ?
      this.invokeLogIn(data.user.house.id, data.jwt) :
      this.setState({notFound: !this.state.notFound})
    }

    invokeLogIn = (idHouse, jwt) => {
      localStorage.setItem('token', jwt)
      localStorage.setItem('house_id', idHouse)
      this.props.fetchHouse(idHouse)
    }

    toggleCreateForm = () => {
      this.setState({showCreateForm: !this.state.showCreateForm})
    }

  render () {
    const {notFound, showCreateForm, inputName, password} = this.state
    const {fetchHouse} = this.props
    return (
      <div>
        <div className="user-search">
          <p className="instructions">To get started, please log in or create an account below!</p>
          <div id="form">
            <form onSubmit={this.handleSubmit}>
              <input name="inputName" placeholder="Enter your name" value={inputName} onChange={this.handleChange} />
              <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.handleChange} />
              <button className="button" type="submit">Log In</button>
            </form>
          </div>
          { notFound ? <p id="error">The entered username or password was incorrect. Please try again.</p> : null}
        </div>
        <div className="add-user">
          <button onClick={this.toggleCreateForm} className="create-act button">Create Account</button>
          <CreateUserForm showCreateForm={showCreateForm} toggleCreateForm={this.toggleCreateForm} fetchHouse={fetchHouse}/>
        </div>
        { notFound ? <p id="error">The username or password were incorrect. Please try again.</p> : null}
      </div>
    )
  }
}

export default UserLogin
