import React, { Component } from 'react'
import GroceryItem from '../GroceryItem/GroceryItem'
import NewGroceryForm from '../NewGroceryForm/NewGroceryForm'
import './GroceryContainer.css'

class GroceryContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNew: false
    }
  }

  toggleNew = () => {
    this.setState({showNew: !this.state.showNew})
  }

  render () {
    const {showNew} = this.state
    const {houseId, groceries, deleteItem, addItem} = this.props
    const groceryList = groceries.map((grocery) => {
      return <GroceryItem key={grocery.id} houseId={houseId} {...grocery} deleteItem={deleteItem} editItem={this.props.editItem}/>
    })
    return (
      <div className="grocery-container">
        <h2>Stuff We Need!</h2>
        <button className="button" onClick={this.toggleNew}>Add a new grocery item</button>
        <NewGroceryForm addItem={addItem} toggleNew={this.toggleNew} showNew={showNew}/>
        {groceryList}
      </div>
    )
  }
}

export default GroceryContainer
