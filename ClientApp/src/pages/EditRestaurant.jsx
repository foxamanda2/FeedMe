import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

export function EditRestaurant() {
  const history = useHistory()

  const params = useParams()
  const id = params.id

  const [errorMessage, setErrorMessage] = useState()

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })

  useEffect(() => {
    fetchRestaurant()
  }, [id])
  const fetchRestaurant = async () => {
    const response = await fetch(`/api/Restaurants/${id}`)
    const apiData = await response.json()
    setRestaurant(apiData)
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
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

    if (response.status === 401) {
      setErrorMessage('Not Authorized')
    } else {
      if (response.status === 400) {
        const json = await response.json()

        setErrorMessage(Object.values(json.errors).join(' '))
      } else {
        history.push('/')
      }
    }
  }

  return (
    <main className="page">
      <nav>
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <h2>Add a Restaurant</h2>
      </nav>
      <form>
        {errorMessage && <p>{errorMessage}</p>}
        <p className="form-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleStringFieldChange}
            placeholder="New Name"
          />
        </p>
        <p className="form-input">
          <textarea
            name="description"
            value={restaurant.description}
            onChange={handleStringFieldChange}
            placeholder="Update Restaurant Description"
          ></textarea>
        </p>
        <p className="form-input">
          <textarea
            name="address"
            value={restaurant.address}
            onChange={handleStringFieldChange}
            placeholder="New Address"
          ></textarea>
        </p>
        <p className="form-input">
          <label htmlFor="name">Telephone</label>
          <input
            type="tel"
            name="telephone"
            value={restaurant.telephone}
            onChange={handleStringFieldChange}
            placeholder="New Phone Number"
          />
        </p>

        <p>
          <button onClick={handleFormSubmit}>Submit</button>
        </p>
      </form>
    </main>
  )
}
