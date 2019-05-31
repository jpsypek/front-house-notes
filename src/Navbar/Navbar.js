import React from 'react'
import GroceryContainer from '../GroceryContainer/GroceryContainer'
import ErrandContainer from '../ErrandContainer/ErrandContainer'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = (props) => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/groceries">Groceries</NavLink>
            </li>
            <li>
              <NavLink to="/errands">Errands</NavLink>
            </li>
          </ul>
        </nav>
        <div className="containers">
          <Route exact={true} path="/" render={() => (
              <div className="get-started">
                <h4>Welcome to House Notes, your one stop aggregator for all things that your home needs.</h4>
                <p>Take a look or add to the list of errands that need to be accomplished or groceries that your house needs by selecting from the menu above!</p>
              </div>
            )} />
          <Route path="/groceries" component={() => <GroceryContainer {...props}/>} />
          <Route path="/errands" component={() => <ErrandContainer {...props}/>} />
        </div>
      </div>
    </Router>
  )
}

export default Navbar
