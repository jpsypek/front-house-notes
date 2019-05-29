import React, { Component } from 'react'
import EditErrandForm from '../EditErrandForm/EditErrandForm'

class ErrandItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false
    }
  }

  toggleEdit = () => {
    this.setState({showEdit: !this.state.showEdit})
  }

  render () {
    const {name, deleteItem, id, description} = this.props
    const {showEdit} = this.state
    return (
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
        <button className="button" onClick={() => deleteItem("errands", id)}>Delete Item</button>
        <button className="button" onClick={this.toggleEdit}>Edit Item</button>
        {showEdit
          ? <EditErrandForm {...this.props} toggleEdit={this.toggleEdit}/>
          : null}
      </div>
    )
  }
}
export default ErrandItem
