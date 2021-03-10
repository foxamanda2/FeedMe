import React from 'react'
import './custom.scss'
import { Randomizer } from './pages/Randomizer'
import { Restaurant } from './pages/Restaurant'
import { Link, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

export function NewRestaurant() {
  return (
    <>
      <form action="submit">
        <h2>Add A New Restaurant</h2>
        <input type="text" placeholder="Name of Restaurant" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Phone Number" />
        <input type="text" placeholder="Type Of Food" />
        <input type="text" placeholder="Price Range (Show with $)" />
        <input type="text" placeholder="Website" />
        <input type="checkbox" placeholder="Dietary Menu" />
        <input type="checkbox" placeholder="Open Late" />
        <input type="checkbox" placeholder="Open Early" />
        <button>Submit</button>
      </form>
    </>
  )
}
export function App() {
  return (
    <>
      <div className="AppBody">
        <header>
          <p className="AppName">Feed Me</p>
          <nav>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/all">Restaurants</a>
              </li>
              <li>
                <a href="/random">Randomizer</a>
              </li>
              <li>
                <a href="/about">Our Table</a>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/random">
            <Randomizer />
          </Route>
          <Route exact path="/all">
            <Restaurant />
          </Route>
          <Route exact path="/new">
            <NewRestaurant />
          </Route>
          <Route path="*">This food page was not found</Route>
        </Switch>
      </div>
    </>
  )
}
