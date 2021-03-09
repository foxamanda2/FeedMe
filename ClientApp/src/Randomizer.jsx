import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

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
        <i className="fab fa-pagelines"></i>
        <p className="Map">Map</p>
      </article>
      {/* <footer>
        <Link to="/">Go Home</Link>
      </footer> */}
    </>
  )
}
