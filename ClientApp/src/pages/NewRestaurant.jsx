import React from 'react'

export function NewRestaurant() {
  return (
    <>
      <form action="submit" className="NewRest">
        <h2>Add A New Restaurant</h2>
        <section className="TypeField">
          <input type="text" placeholder="Name of Restaurant" />
          <textarea type="text" placeholder="Description"></textarea>
          <textarea type="text" placeholder="Address"></textarea>
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Type Of Food" />
          <input type="text" placeholder="Price Range (Show with $)" />
          <input type="text" placeholder="Website" />
          <label htmlFor="name">Does the restaurant have a dietary menu?</label>
        </section>

        <section className="Checked">
          <input type="checkbox" placeholder="Dietary Menu" />
          <label htmlFor="name">Is the restaurant open late? (Past 9pm)</label>
          <input type="checkbox" placeholder="Open Late" />
          <label htmlFor="name">
            Is the restaurant open early? (Before 9am)
          </label>
          <input type="checkbox" placeholder="Open Early" />
        </section>
        <button>Submit</button>
      </form>
    </>
  )
}
