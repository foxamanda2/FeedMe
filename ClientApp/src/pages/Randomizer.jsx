import React from 'react'

export function Randomizer() {
  return (
    <>
      <aside>
        <select className="Diet">
          <option value="Vegan">Vegan</option>
          <option value="Gluten">Gluten Free</option>
          <option value="Veg">Vegetarian</option>
        </select>
        <input type="text" placeholder="Diet" />
        <input type="text" placeholder="Hours" />
        <input type="text" placeholder="Type" />
        <input type="text" placeholder="Location" />
        <footer>
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
      </section>
      <article>
        <p>Reviews</p>
        <div class="stars">
          <span style={{ '--rating': 4.7 }}></span>
        </div>
        <p className="Map">Map</p>
      </article>
      {/* <footer>
        <Link to="/">Go Home</Link>
      </footer> */}
    </>
  )
}
