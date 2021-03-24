import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NewReviewModal } from './NewReview'
import { Stars } from '../components/Stars'

function SingleRestaurantFromList(props) {
  const [userPressedNew, setUserPressedNew] = useState(false)

  const restaurant = props.restaurant

  function closeModal() {
    setUserPressedNew(false)
  }

  return (
    <li key={restaurant.id}>
      <a href={restaurant.website}>
        <h2>{restaurant.name}</h2>
      </a>
      <p>
        {restaurant.priceRange} {restaurant.typeOfFood}
      </p>
      <p>{restaurant.description}</p>
      <address> {restaurant.address}</address>
      <p>{restaurant.phoneNum}</p>

      <p className="allCheck">
        Dietary Menu:
        <input type="checkbox" checked={restaurant.dietaryMenu} readOnly />
      </p>

      <Link to={`/restaurants/${restaurant.id}`}>
        <Stars restaurant={restaurant} />
      </Link>

      {userPressedNew ? (
        <NewReviewModal closeModal={closeModal} restaurant={restaurant} />
      ) : (
        <></>
      )}

      <button
        onClick={function (event) {
          event.preventDefault()

          setUserPressedNew(true)
        }}
      >
        New Review
      </button>

      <button className="editButton">
        <Link to={`/restaurants/${restaurant.id}/edit`}>Update</Link>
      </button>
    </li>
  )
}

export function Restaurant() {
  const [restaurants, setRestaurants] = useState([])
  const [dietTypes, setDietTypes] = useState([])
  const [filterText, setFilterText] = useState('')

  // Search parameters
  const [selectedDietTypeId, setSelectedDietTypeId] = useState(0)
  const [typeOfFood, setTypeOfFood] = useState('')
  const [openEarly, setOpenEarly] = useState(false)
  const [openLate, setOpenLate] = useState(false)

  useEffect(() => {
    async function fetchRestaurants() {
      let url = '/api/Restaurants'

      url += `?filter=${filterText}`
      url += `&dietTypeId=${selectedDietTypeId}`
      url += `&typeOfFood=${typeOfFood}`
      url += `&openEarly=${openEarly}`
      url += `&openLate=${openLate}`

      const response = await fetch(url)
      const json = await response.json()

      const uniqueRestaurants = Object.values(
        json.reduce(
          (result, restaurant) =>
            Object.keys(result).includes(restaurant.id)
              ? result
              : { ...result, [restaurant.id]: restaurant },
          {}
        )
      )

      setRestaurants(uniqueRestaurants)
    }

    fetchRestaurants()
  }, [filterText, selectedDietTypeId, openEarly, openLate, typeOfFood])

  useEffect(() => {
    async function fetchDietType() {
      const url = '/api/DietTypes'

      const response = await fetch(url)
      const json = await response.json()

      setDietTypes(json)
    }

    fetchDietType()
  }, [])

  const typesOfFood = [
    ...new Set(restaurants.map((restaurant) => restaurant.typeOfFood)),
  ]

  return (
    <>
      <div className="Restaurants">
        <div className="searchDrop">
          <select
            value={selectedDietTypeId}
            onChange={function (event) {
              setSelectedDietTypeId(Number(event.target.value))
            }}
          >
            <option value="">Diet Type</option>
            {dietTypes.map(function (diet) {
              return (
                <option key={diet.id} value={diet.id}>
                  {diet.diet}
                </option>
              )
            })}
          </select>

          <select
            onChange={function (event) {
              setOpenEarly(Boolean(event.target.value))
            }}
          >
            <option value="">Open Early?</option>
            <option value="true">Yes</option>
          </select>

          <select
            onChange={function (event) {
              setOpenLate(Boolean(event.target.value))
            }}
          >
            <option value="">Open Late?</option>
            <option value="true">Yes</option>
          </select>

          <select
            value={typeOfFood}
            onChange={function (event) {
              setTypeOfFood(event.target.value)
            }}
          >
            <option value="">Type Of Food</option>
            {typesOfFood.map(function (typeOfFood) {
              return (
                <option key={typeOfFood} value={typeOfFood}>
                  {typeOfFood}
                </option>
              )
            })}
          </select>
        </div>

        <div className="Search">
          <input
            type="Text"
            placeholder="Search"
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />

          <Link to="/new">
            <button>Add Restaurant</button>
          </Link>
        </div>
        <ul className="results">
          {restaurants.map(function (restaurant) {
            return (
              <SingleRestaurantFromList
                key={restaurant.id}
                restaurant={restaurant}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}
