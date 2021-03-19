import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function NewRestaurant() {
  const [newRestaurant, setNewRestaurant] = useState({
    name: 'Place',
    description: 'Here',
    address: 'To',
    phoneNum: 'Eat',
    typeOfFood: 'Food',
    priceRange: 'Here',
    dietaryMenu: false,
    website: 'Now',
    openLate: false,
    openEarly: false,
  })
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [dietTypes, setDietTypes] = useState([])

  const [selectedDietTypeIds, setSelectedDietTypeIds] = useState([])

  // Functions and fetch for restaurant
  function handleFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  function handleBoolFunction(event) {
    let value = event.target.checked
    const fieldName = event.target.name

    console.log(value)

    console.log(fieldName)

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  async function handleNewRestaurantSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Restaurants', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newRestaurant),
    })
    const json = await response.json()

    // Reset the form
    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      const promises = selectedDietTypeIds.map(function (dietTypeId) {
        // Here is where we send a post to the api
        return fetch('/api/RestaurantDietTypes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            restaurantId: json.id,
            dietTypeId: dietTypeId,
          }),
        })
      })

      Promise.all(promises)

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

  // Funtions and fetch for Restaurant Diet Type
  // async function submitNewRestaurantDietType(event) {
  //   event.preventDefault()

  //   await fetch('/api/RestaurantDietType', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(restaurantDietType),
  //   })
  // }

  console.log(newRestaurant)

  // Functions and fetch for Diet Type

  useEffect(() => {
    async function fetchDietTypes() {
      const url = '/api/DietTypes'

      const response = await fetch(url)
      const json = await response.json()

      setDietTypes(json)
    }

    fetchDietTypes()
  }, [])

  function handleDietFunction(event) {
    let value = event.target.value
    const fieldName = event.target.name

    console.log(value)

    console.log(fieldName)

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  return (
    <>
      <form
        action="submit"
        className="NewRest"
        onSubmit={handleNewRestaurantSubmit}
      >
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
            // type="text"
            placeholder="Description"
            name="description"
            onChange={handleFieldChange}
            value={newRestaurant.description}
          />

          {/* Address */}
          <textarea
            // type="text"
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
            name="dietaryMenu"
            onChange={handleBoolFunction}
            checked={newRestaurant.dietaryMenu}
          />

          {/* Open Late Bool */}
          <label htmlFor="name">Is the restaurant open late?(Past 9pm)</label>
          <input
            type="checkbox"
            placeholder="Open Late"
            name="openLate"
            onChange={handleBoolFunction}
            checked={newRestaurant.openLate}
          />

          {/* Open Early Bool */}
          <label htmlFor="name">
            Is the restaurant open early?(Before 9am)
          </label>
          <input
            type="checkbox"
            placeholder="Open Early"
            name="openEarly"
            onChange={handleBoolFunction}
            checked={newRestaurant.openEarly}
          />
        </section>

        <section>
          {dietTypes.map(function (diet) {
            return (
              <>
                <input
                  key={diet.id}
                  // value={diet.id}
                  checked={selectedDietTypeIds.includes(diet.id)}
                  type="checkbox"
                  name="dietType"
                  onChange={function (event) {
                    if (event.target.checked) {
                      setSelectedDietTypeIds([...selectedDietTypeIds, diet.id])
                    } else {
                      setSelectedDietTypeIds(
                        selectedDietTypeIds.filter((id) => id != diet.id)
                      )
                    }
                  }}
                />
                {diet.diet}
              </>
            )
          })}
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
