import React, { Component } from 'react'
import GroceryItem from '../GroceryItem/GroceryItem'
import NewGroceryForm from '../NewGroceryForm/NewGroceryForm'

class GroceryContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showNew: false
    }
  }

  handleClick = () => {
    this.setState({
      showNew: !this.state.showNew
    })
  }

  render () {
    const {showNew} = this.state
    const {houseId, groceries} = this.props
    const groceryList = groceries.map((grocery) => {
      return <GroceryItem key={grocery.id} houseId={houseId} {...grocery} />
    })
    return (
      <div>
        <h1>Needed Groceries</h1>
        {groceryList}
        <button onClick={this.handleClick}>Add a new grocery item</button>
        {showNew ? <NewGroceryForm /> : null}
      </div>
    )
  }
}

export default GroceryContainer
