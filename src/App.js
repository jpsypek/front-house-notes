import React, { Component } from 'react';
import './App.css';
import UserLogin from './UserLogin/UserLogin'
import GroceryContainer from './GroceryContainer/GroceryContainer'
import ErrandContainer from './ErrandContainer/ErrandContainer'
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

  fetchHouse = (id) => {
    this.logIn(id)
    fetch(`http://localhost:3000/api/v1/houses/${id}`)
      .then(response => response.json())
      .then(house => this.setState({
        groceries: house.data.attributes.groceries,
        errands: house.data.attributes.errands
      }))
      .catch(error => console.error(error))
  }

  logIn = (id) => {
    this.setState({
      loggedIn: true,
      houseId: id})
  }

  deleteItem = (type, id) => {
    const newState = this.state[type].filter((object) => object.id !== id)
    this.setState({[type]: newState})
    const body = {id}
    fetch(`http://localhost:3000/api/v1/${type}/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
      .catch(error => (console.error(error.message)))
  }

  addItem = (type, item) => {
    const newState = [...this.state[type], item]
    this.setState({[type]: newState})
    const body = {...item, house_id: this.state.houseId}
    fetch(`http://localhost:3000/api/v1/${type}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
      .then(() => this.fetchHouse(this.state.houseId))
      .catch(error => (console.error(error.message)))
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
        },
        body: JSON.stringify(body)
      })
      .then(() => this.fetchHouse(houseId))
      .catch(error => (console.error(error.message)))
  }


  render () {
    const {loggedIn, groceries, errands} = this.state
    return (
      <div>
        <header>
          {loggedIn ? <h1>Roommate Reference!</h1> : <h1>Welcome to the Roommate Reference</h1>}
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
