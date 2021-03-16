import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Randomizer() {
  const [randRestaurants, setRandRestaurants] = useState([])

  const params = useParams()

  let id = Number(params.id)

  useEffect(() => {
    async function fetchRestaurant() {
      const randId = Math.floor(Math.random(id))
      const response = await fetch(`/api/Restaurants/${randId}`)
      const apiData = await response.json()

      setRandRestaurants(apiData)
    }
    fetchRestaurant()
  }, [id])

  console.log(randRestaurants)

  return (
    <>
      <aside>
        <select className="Diet">
          <option value="Vegan">Vegan</option>
          <option value="Gluten">Gluten Free</option>
          <option value="Veg">Vegetarian</option>
        </select>
        <select>
          <option>Open Early</option>
          <option>Open Late</option>
        </select>
        <select>
          <option>Mexican</option>
          <option>Comfort</option>
        </select>
        <footer>
          {/* Need to create a random Link */}
          <button className="Random">Randomizer</button>
        </footer>
      </aside>

      <section className="RandomRest">
        <a href="https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic">
          <h2>Farmacy Vegan Kitchen + Bakery</h2>
        </a>
        <p>$$</p>
        <p>
          This urban spot serves all kinds of all vegan comfort food. From mac
          and cheese to a philly cheese steak made from impossible meat, you are
          sure to find something delicious.
        </p>
        <address> 803 N Tampa St, Tampa, Florida 33602</address>
        <p>(786) 681-1644</p>
        <p>Hours: 11am-4pm</p>
        <div className="stars">
          <span style={{ '--rating': 4.7 }}></span>(2)
        </div>
      </section>
      <article>
        <p className="Map">Map</p>
      </article>
      {/* <footer>
        <Link to="/">Go Home</Link>
      </footer> */}
    </>
  )
}
