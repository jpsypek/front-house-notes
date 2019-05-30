import React, { Component } from 'react'
import ErrandItem from '../ErrandItem/ErrandItem'
import NewErrandForm from '../NewErrandForm/NewErrandForm'
import './ErrandContainer.css'

class ErrandContainer extends Component {
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
    const {houseId, errands, deleteItem, addItem} = this.props
    const errandList = errands.map((errand) => {
      return <ErrandItem key={errand.id} houseId={houseId} {...errand} deleteItem={deleteItem} editItem={this.props.editItem}/>
    })
    return (
      <div className="errand-container">
        <h2>Shit To Do!</h2>
        <button className="button" onClick={this.toggleNew}>Add a new errand</button>
        <NewErrandForm addItem={addItem} toggleNew={this.toggleNew} showNew={showNew}/>
        {errandList}
      </div>
    )
  }
}

export default ErrandContainer
