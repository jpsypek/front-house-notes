import React, { Component } from 'react';
import './App.css';
import UserLogin from './UserLogin/UserLogin'
import GroceryContainer from './GroceryContainer/GroceryContainer'

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

  deleteGrocery = (id) => {
    const groceries = this.state.groceries.filter((grocery) => grocery.id !== id)
    this.setState({groceries})
    const body = {id}
  }

  createBody

  render () {
    const {loggedIn, groceries, houseId} = this.state
    return (
      <div>
        { loggedIn ?
          <GroceryContainer groceries={groceries} houseId={houseId} />
          : <UserLogin fetchHouse={this.fetchHouse}/>}
      </div>
    )
  }
}

export default App;
