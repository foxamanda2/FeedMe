import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function NewRestaurant() {
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    phoneNum: '',
    typeOfFood: '',
    priceRange: '',
    dietaryMenu: false,
    website: '',
    openLate: false,
    openEarly: false,
  })
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  // 19 min in the lecture
  // function hangleBoolFieldChange(event) {
  //   const value = parse.bool(event.target.value)
  //   const fieldBool = event.target.value
  // }

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Restaurants', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newRestaurant),
    })

    const json = await response.json()

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      setNewRestaurant({
        name: '',
        description: '',
        address: '',
        phoneNum: '',
        typeOfFood: '',
        priceRange: '',
        dietaryMenu: false,
        website: '',
        openLate: false,
        openEarly: false,
      })

      setMessage('Submitted new food! Thank You!')
    }
  }

  return (
    <>
      <form action="submit" className="NewRest" onSubmit={handleSubmit}>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <h2>Add A New Restaurant</h2>
        <section className="TextField">
          {/* Name Of Restaurant */}
          <input
            type="text"
            placeholder="Name of Restaurant"
            name="name"
            onChange={handleFieldChange}
            value={newRestaurant.name}
          />

          {/* Description */}
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleFieldChange}
            value={newRestaurant.description}
          />

          {/* Address */}
          <textarea
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleFieldChange}
            value={newRestaurant.address}
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number of Restaurant"
            name="phoneNum"
            onChange={handleFieldChange}
            value={newRestaurant.phoneNum}
          />

          {/* Type Of Food */}
          <input
            type="text"
            placeholder="Type of Food"
            name="typeOfFood"
            onChange={handleFieldChange}
            value={newRestaurant.typeOfFood}
          />

          {/* Price Range */}
          <input
            type="text"
            placeholder="Price Range"
            name="priceRange"
            onChange={handleFieldChange}
            value={newRestaurant.priceRange}
          />

          {/* Website */}
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={handleFieldChange}
            value={newRestaurant.website}
          />
        </section>

        <section className="Checked">
          {/* Dietary Menu Bool */}
          <label htmlFor="name">Does the restaurant have a dietary menu?</label>
          <input
            type="checkbox"
            placeholder="Dietary Menu"
            name="dietary menu"
            value={newRestaurant.dietaryMenu}
          />

          {/* Open Late Bool */}
          <label htmlFor="name">Is the restaurant open late?(Past 9pm)</label>
          <input
            type="checkbox"
            placeholder="Open Late"
            name="openlate"
            value={newRestaurant.openLate}
          />

          {/* Open Early Bool */}
          <label htmlFor="name">
            Is the restaurant open early?(Before 9am)
          </label>
          <input
            type="checkbox"
            placeholder="Open Early"
            name="openearly"
            value={newRestaurant.openEarly}
          />
        </section>
        <div>
          <button type="submit" value="Submit">
            Submit
          </button>
          <Link to="/">
            <span>{message}</span>
          </Link>
        </div>
      </form>
    </>
  )
}
