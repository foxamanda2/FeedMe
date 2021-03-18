import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function EditRestaurant() {
  const params = useParams()
  const id = params.id

  const [message, setMessage] = useState('')

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    phoneNum: '',
    typeOfFood: '',
    priceRange: '',
    dietaryMenu: null,
    website: '',
    openLate: null,
    openEarly: null,
  })

  useEffect(() => {
    fetchRestaurant()
  }, [id])

  const fetchRestaurant = async () => {
    const response = await fetch(`/api/Restaurants/${id}`)
    const apiData = await response.json()

    setRestaurant(apiData)
  }

  function handleStringChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedRestaurant = { ...restaurant, [fieldName]: value }

    setRestaurant(updatedRestaurant)
  }

  function handleBoolChange(event) {
    let value = event.target.checked
    const fieldName = event.target.name

    const updatedRestaurant = { ...restaurant, [fieldName]: value }

    setRestaurant(updatedRestaurant)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    await fetch(`/api/Restaurants/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(restaurant),
    })
    setMessage('Updated your food! Click Here to go back.')
  }

  return (
    <main className="updatePage">
      <h2>Update</h2>
      <h2>{restaurant.name}</h2>
      <form className="updateForm">
        <textarea
          name="description"
          value={restaurant.description}
          onChange={handleStringChange}
          placeholder="Update Restaurant Description"
        ></textarea>

        <textarea
          name="address"
          value={restaurant.address}
          onChange={handleStringChange}
          placeholder="New Address"
        ></textarea>

        <input
          type="tel"
          name="telephone"
          value={restaurant.phoneNum}
          onChange={handleStringChange}
          placeholder="New Phone Number"
        />

        <label htmlFor="name">Does the restaurant have a dietary menu?</label>
        <input
          type="checkbox"
          placeholder="Dietary Menu"
          name="dietaryMenu"
          onChange={handleBoolChange}
          checked={restaurant.dietaryMenu}
        />

        {/* Open Late Bool */}
        <label htmlFor="name">Is the restaurant open late?(Past 9pm)</label>
        <input
          type="checkbox"
          placeholder="Open Late"
          name="openLate"
          onChange={handleBoolChange}
          checked={restaurant.openLate}
        />

        {/* Open Early Bool */}
        <label htmlFor="name">Is the restaurant open early?(Before 9am)</label>
        <input
          type="checkbox"
          placeholder="Open Early"
          name="openEarly"
          onChange={handleBoolChange}
          checked={restaurant.openEarly}
        />

        <div>
          <button onClick={handleFormSubmit}>Submit</button>
          <Link to="/all">
            <div className="message">{message}</div>
          </Link>
        </div>
      </form>
    </main>
  )
}
