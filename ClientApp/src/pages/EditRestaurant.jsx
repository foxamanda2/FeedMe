import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

export function EditRestaurant() {
  const history = useHistory()

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

    const response = await fetch(`/api/Restaurants/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(restaurant),
    })
    setMessage('Updated your food!')
  }

  return (
    <main className="page">
      <h2>Update a Restaurant</h2>
      <form>
        <p className="form-input">
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleStringChange}
            placeholder="New Name"
          />
        </p>
        <p className="form-input">
          <textarea
            name="description"
            value={restaurant.description}
            onChange={handleStringChange}
            placeholder="Update Restaurant Description"
          ></textarea>
        </p>
        <p className="form-input">
          <textarea
            name="address"
            value={restaurant.address}
            onChange={handleStringChange}
            placeholder="New Address"
          ></textarea>
        </p>
        <p className="form-input">
          <input
            type="tel"
            name="telephone"
            value={restaurant.phoneNum}
            onChange={handleStringChange}
            placeholder="New Phone Number"
          />
        </p>
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

        <p>
          <button onClick={handleFormSubmit}>Submit</button>
          <Link to="/all">
            <p>{message}</p>
          </Link>
        </p>
      </form>
    </main>
  )
}
