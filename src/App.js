import React, { Component } from 'react';
import './App.css';
import UserLogin from './UserLogin/UserLogin'
import Navbar from './Navbar/Navbar'

class App extends Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false,
      groceries: [],
      errands: [],
      houseId: ""
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.fetchHouse(localStorage.getItem("house_id"))
    }
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "http://localhost:3001/"
    this.setState({
      loggedIn: false,
      groceries: [],
      errands: [],
      houseId: ""
    })
  }

  fetchHouse = (idHouse) => {
    this.logIn(idHouse)
    fetch(`http://localhost:3000/api/v1/houses/${idHouse}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
  }
    })
      .then(response => response.json())
      .then(house => this.setState({
        groceries: house.data.attributes.groceries,
        errands: house.data.attributes.errands
      }))
      .catch(error => console.error(error))
  }

  logIn = (idHouse) => {
    this.setState({
      loggedIn: true,
      houseId: idHouse})
  }

  deleteItem = (type, id) => {
    const newState = this.state[type].filter((object) => object.id !== id)
    this.setState({[type]: newState})
    const body = {id}
    fetch(`http://localhost:3000/api/v1/${type}/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .catch(error => (console.error(error)))
  }

  addItem = (type, item) => {
    const newState = [...this.state[type], item]
    this.setState({[type]: newState})
    const body = {...item, house_id: this.state.houseId}
    fetch(`http://localhost:3000/api/v1/${type}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .then(() => this.fetchHouse(this.state.houseId))
      .catch(error => (console.error(error)))
  }

  editItem = (type, item) => {
    const {houseId} = this.state
    const newState = this.state[type].filter((object) => object.id !== item.id)
    this.setState({[type]: [...newState, item]})
    const body = {...item, house_id: houseId}
    fetch(`http://localhost:3000/api/v1/${type}/${item.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      })
      .then(() => this.fetchHouse(houseId))
      .catch(error => (console.error(error)))
  }


  render () {
    const {loggedIn, groceries, errands} = this.state
    return (
      <div>
        <header>
          {loggedIn ?
            <div>
              <h1>House Notes!</h1>
              <button className="button log-out" onClick={this.logOut}>Log Out</button>
            </div> :
             <h1>Welcome to House Notes!</h1>
              }
        </header>
        { loggedIn ?
          <Navbar groceries={groceries} errands={errands} addItem={this.addItem} editItem={this.editItem} deleteItem={this.deleteItem}/> :
          <div className="content">
            <UserLogin fetchHouse={this.fetchHouse}/>
          </div>}
      </div>
    )
  }
}

export default App;
