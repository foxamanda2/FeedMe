import React from 'react'
import './custom.scss'
import { Restaurant } from './Restaurant'

export function Randomizer() {
  return (
    <>
      <aside>
        <input type="text" placeholder="Diet" />
        <input type="text" placeholder="Hours" />
        <input type="text" placeholder="Type" />
        <input type="text" placeholder="Location" />
        <footer>
          <button className="Random">Randomizer</button>
        </footer>
      </aside>

      <section>
        <p>Restaurant name</p>
        <p>Description</p>
        <p>Hours</p>
        <p>Address</p>
        <p>Dietary Menu</p>
      </section>
      <article>
        <p>Reviews</p>
      </article>
    </>
  )
}
export function App() {
  return (
    <div>
      <main>
        {/* <Restaurant /> */}
        <Randomizer />
      </main>
    </div>
  )
}
