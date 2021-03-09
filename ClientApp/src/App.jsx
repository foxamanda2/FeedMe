import React from 'react'
import './custom.scss'
import { Randomizer } from './Randomizer'
import { Restaurant } from './Restaurant'
import { Link, Route, Switch } from 'react-router-dom'

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
          <Route exact path="/"></Route>
          <Route exact path="/random">
            <Randomizer />
          </Route>
          <Route exact path="/all">
            <Restaurant />
          </Route>
          <Route path="*">This food page was not found</Route>
        </Switch>
      </div>
    </>
  )
}
