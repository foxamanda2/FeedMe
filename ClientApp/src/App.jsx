import React from 'react'
import './custom.scss'
import { Randomizer } from './pages/Randomizer'
import { Restaurant } from './pages/Restaurant'
import { Link, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NewRestaurant } from './pages/NewRestaurant'
import { About } from './pages/About'
import { Reviews } from './pages/Reviews'
import { EditRestaurant } from './pages/EditRestaurant'

export function App() {
  return (
    <>
      <div className="AppBody">
        <header>
          <p className="AppName">Feed Me</p>
          <div className="navigation">
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
                  <Link to="/all">Restaurants</Link>
                </li>
                <li>
                  <Link to="/random">Randomizer</Link>
                </li>
                <li>
                  <Link to="/about">Our Table</Link>
                </li>
              </ul>
            </nav>
          </div>
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
          <Route exact path="/restaurants/:id">
            <Reviews />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/restaurants/:id/edit">
            <EditRestaurant />
          </Route>
          <Route path="*">This food page was not found</Route>
        </Switch>
      </div>
    </>
  )
}
